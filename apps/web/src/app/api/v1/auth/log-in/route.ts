import type z from "@repo/zod";
import { logInSchema } from "@repo/zod";
import { type NextRequest, NextResponse } from "next/server";

import { HttpError, handleServerError } from "~/server/lib/errors";
import { extractRequestMeta } from "~/server/lib/utils";
import { rateLimit, validateRequest } from "~/server/middlewares";
import { createSession } from "~/server/services/session";
import { generateJWT, setTokens } from "~/server/services/token";
import { verifyUserPasswordOrThrow } from "~/server/services/user";

type LogInBody = z.infer<typeof logInSchema>;

type WithLogInHandler = ({
  body,
  userAgent,
  headers,
}: {
  body: LogInBody;
  userAgent: string;
  headers: Record<string, string>;
}) => Promise<NextResponse>;

function withLogInHandler(handler: WithLogInHandler) {
  return async (req: NextRequest) => {
    const meta = extractRequestMeta(req, [
      "requestId",
      "ip",
      "method",
      "url",
      "userAgent",
    ]);

    let headers = {};

    try {
      const { isLimited, rateLimitHeaders } = await rateLimit({
        key: `rate-limit:/api/v1/auth/sign-up:ip-${meta.ip}`,
        limit: 10,
        windowInSec: 60,
      });

      headers = rateLimitHeaders;
      if (isLimited) {
        throw new HttpError({
          message: "Too many requests. Please try again later.",
          code: "too_many_requests",
        });
      }

      const body = await validateRequest<LogInBody>(req, logInSchema);

      const userAgent = meta.userAgent || "unknown";

      return await handler({ body, userAgent, headers });
    } catch (err) {
      const { statusCode, ...rest } = handleServerError({ err, meta });
      return NextResponse.json(rest, { status: statusCode, headers });
    }
  };
}

export const POST = withLogInHandler(async ({ body, userAgent, headers }) => {
  const user = await verifyUserPasswordOrThrow(body);

  const accessTokenExpiry = new Date(Date.now() + 30 * 60 * 1000);
  const refreshTokenExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const session = await createSession({
    device: userAgent,
    expiresAt: refreshTokenExpiry,
    user: {
      connect: { id: user.id },
    },
  });

  const accessToken = await generateJWT({
    type: "access",
    userId: user.id,
    expiry: accessTokenExpiry,
  });

  const refreshToken = await generateJWT({
    type: "refresh",
    sessionId: session.id,
    expiry: refreshTokenExpiry,
  });

  await setTokens({
    accessToken,
    accessTokenExpiry,
    refreshToken,
    refreshTokenExpiry,
  });

  return NextResponse.json(
    {
      status: "success",
      message: "User successfully logged in.",
    },
    { headers },
  );
});
