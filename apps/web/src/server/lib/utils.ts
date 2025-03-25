import type { NextRequest } from "next/server";

export type RequestMeta = {
  requestId: string;
  method: string;
  url: string;
  userAgent: string;
  ip: string;
  sessionId: string | undefined;
  originalPath: string | undefined;
};

export type RequestMetaKey = keyof RequestMeta;

export function extractRequestMeta<K extends RequestMetaKey>(
  req: NextRequest,
  keys: K[],
): Pick<RequestMeta, K> {
  const fullMeta: RequestMeta = {
    requestId: req.headers.get("x-request-id") ?? "unknown",
    method: req.method,
    url: req.nextUrl.pathname,
    userAgent: req.headers.get("user-agent") ?? "unknown",
    ip:
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "unknown",
    sessionId: req.headers.get("x-session-id") ?? undefined,
    originalPath: req.headers.get("x-original-path") ?? undefined,
  };

  const selectedMeta = {} as Pick<RequestMeta, K>;

  for (const key of keys) {
    selectedMeta[key] = fullMeta[key];
  }

  return selectedMeta;
}
