import { type NextRequest, NextResponse } from "next/server";
import { HttpError, handleServerError } from "~/server/lib/errors";
import { extractRequestMeta } from "~/server/lib/utils";
import { rateLimit } from "~/server/middlewares";
import {
  createSession,
  deleteSession,
  getSession,
} from "~/server/services/session";

import { generateJWT, setTokens } from "~/server/services/token";

type WithRefreshHandler = ({
  sessionId,
  userAgent,
  originalUrl,
}: {
  sessionId: string;
  userAgent: string;
  originalUrl: URL;
}) => Promise<NextResponse>;

function withRefreshHandler(handler: WithRefreshHandler) {
  return async (req: NextRequest) => {
    const meta = extractRequestMeta(req, [
      "requestId",
      "ip",
      "method",
      "url",
      "userAgent",
      "sessionId",
      "originalPath",
    ]);

    let headers = {};

    try {
      if (!meta.sessionId || !meta.originalPath) {
        throw new HttpError({
          message: "Not authorized.",
          code: "unauthorized",
        });
      }

      const { isLimited, rateLimitHeaders } = await rateLimit({
        key: `rate-limit:/api/v1/auth/refresh:session-${meta.sessionId}`,
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

      const originalUrl = new URL(meta.originalPath, req.url);

      return await handler({
        sessionId: meta.sessionId,
        userAgent: meta.userAgent,
        originalUrl,
      });
    } catch (err) {
      const { statusCode, ...rest } = handleServerError({ err, meta });

      if (statusCode === 429) {
        return NextResponse.json(rest, { status: statusCode, headers });
      }

      return NextResponse.redirect(new URL("/sign-up", req.url));
    }
  };
}

export const GET = withRefreshHandler(
  async ({ sessionId, userAgent, originalUrl }) => {
    const session = await getSession({ id: sessionId });

    if (!session || new Date(session.expiresAt) < new Date()) {
      throw new HttpError({
        message: "Session not found or is invalid.",
        code: "unauthorized",
      });
    }

    const accessTokenExpiry = new Date(Date.now() + 30 * 60 * 1000);
    const refreshTokenExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const newSession = await createSession({
      device: userAgent,
      expiresAt: refreshTokenExpiry,
      user: {
        connect: { id: session.userId },
      },
    });

    const accessToken = await generateJWT({
      type: "access",
      userId: newSession.userId,
      expiry: accessTokenExpiry,
    });

    const refreshToken = await generateJWT({
      type: "refresh",
      sessionId: newSession.id,
      expiry: refreshTokenExpiry,
    });

    await setTokens({
      accessToken,
      accessTokenExpiry,
      refreshToken,
      refreshTokenExpiry,
    });

    await deleteSession({ id: session.id });

    return NextResponse.redirect(originalUrl);
  },
);
