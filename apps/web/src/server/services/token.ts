import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const issuer = process.env.JWT_ISSUER || "";
const audience = process.env.JWT_AUDIENCE || "";

type JWTOptions =
  | {
      type: "access";
      userId: string;
      orgId?: string;
      role?: string;
      expiry: Date;
    }
  | { type: "refresh"; sessionId: string; expiry: Date };

export async function generateJWT(options: JWTOptions) {
  const { type, expiry, ...rest } = options;
  const secret =
    type === "access"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET;

  const token = await new SignJWT(rest)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime(expiry)
    .sign(new TextEncoder().encode(secret));

  return token;
}

export type AccessTokenPayload = JWTPayload & {
  userId: string;
  orgId: string;
  role: string;
};

export type RefreshTokenPayload = JWTPayload & {
  sessionId: string;
};

type TokenPayload = AccessTokenPayload | RefreshTokenPayload;

export async function verifyJWT<T extends TokenPayload>({
  type,
  token,
}: { type: string; token: string }): Promise<T | null> {
  const secret =
    type === "access"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      {
        algorithms: ["HS256"],
        issuer,
        audience,
      },
    );
    return payload as T;
  } catch (error) {
    return null;
  }
}

export async function setTokens({
  accessToken,
  accessTokenExpiry,
  refreshToken,
  refreshTokenExpiry,
}: {
  accessToken: string;
  accessTokenExpiry: Date;
  refreshToken: string;
  refreshTokenExpiry: Date;
}) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax" as const,
  };

  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    ...cookieOptions,
    expires: accessTokenExpiry,
  });

  cookieStore.set("refreshToken", refreshToken, {
    ...cookieOptions,
    expires: refreshTokenExpiry,
  });
}
