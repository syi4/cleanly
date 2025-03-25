import { nanoid } from "nanoid";
import { type NextRequest, NextResponse } from "next/server";
import {
  type AccessTokenPayload,
  type RefreshTokenPayload,
  verifyJWT,
} from "~/server/services/token";

function addRequestIdHeader(response: NextResponse): NextResponse {
  let modifiedResponse = response;

  const headers = new Headers(modifiedResponse.headers);
  headers.set("x-request-id", nanoid());
  modifiedResponse = new NextResponse(modifiedResponse.body, {
    status: modifiedResponse.status,
    statusText: modifiedResponse.statusText,
    headers: headers,
  });

  return modifiedResponse;
}

async function isValidAccessToken(accessToken: string | undefined) {
  if (!accessToken) {
    return null;
  }
  const payload = await verifyJWT<AccessTokenPayload>({
    type: "access",
    token: accessToken,
  });
  return payload;
}

async function isValidRefreshToken(refreshToken: string | undefined) {
  if (!refreshToken) {
    return null;
  }
  const payload = await verifyJWT<RefreshTokenPayload>({
    type: "refresh",
    token: refreshToken,
  });
  return payload;
}

async function verifyAuth(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (await isValidAccessToken(accessToken)) {
    return NextResponse.next();
  }

  const refreshTokenPayload = await isValidRefreshToken(refreshToken);

  if (!refreshToken || !refreshTokenPayload) {
    return NextResponse.redirect(new URL("/sign-up", req.url));
  }

  const reqHeaders = new Headers(req.headers);
  reqHeaders.set("x-session-id", refreshTokenPayload.sessionId);
  reqHeaders.set("x-original-path", req.nextUrl.pathname);

  return NextResponse.rewrite(new URL("/api/v1/auth/refresh", req.url), {
    request: {
      headers: reqHeaders,
    },
  });
}

const privateRoutes = ["/onboarding", "/random"];
const privateApi = ["/api/user/me", "/api/user/profile", "/api/user/password"];

export async function middleware(req: NextRequest) {
  const isPrivateRoute = privateRoutes.includes(req.nextUrl.pathname);

  let response: NextResponse;

  if (isPrivateRoute) {
    response = await verifyAuth(req);
  } else {
    response = NextResponse.next();
  }

  return addRequestIdHeader(response);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     *  * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|images|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
