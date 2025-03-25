import { redis } from "~/server/redis";

export type RateLimitHeaders = {
  "x-ratelimit-limit": string;
  "x-ratelimit-remaining": string;
  "x-ratelimit-reset": string;
  "retry-after"?: string;
};

export async function rateLimit({
  key,
  limit,
  windowInSec,
}: {
  key: string;
  limit: number;
  windowInSec: number;
}) {
  const now = Math.floor(Date.now() / 1000);

  const requestCount = await redis.incr(key);

  if (requestCount === 1) {
    await redis.expire(key, windowInSec);
  }

  const isLimited = requestCount > limit;
  const remaining = isLimited ? "0" : String(Math.max(0, limit - requestCount));

  const headers: RateLimitHeaders = {
    "x-ratelimit-limit": String(limit),
    "x-ratelimit-reset": String(now + windowInSec),
    "x-ratelimit-remaining": remaining,
  };

  if (isLimited) {
    headers["retry-after"] = String(windowInSec);
  }

  return { isLimited, rateLimitHeaders: headers };
}
