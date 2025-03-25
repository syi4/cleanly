import z from "@repo/zod";
import { NextResponse } from "next/server";

import { logger } from "~/server/lib/logger";
import type { RequestMeta } from "~/server/lib/utils";

export const ErrorCode = z.enum([
  "bad_request",
  "not_found",
  "internal_server_error",
  "unauthorized",
  "forbidden",
  "too_many_requests",
  "invite_expired",
  "invite_pending",
  "exceeded_limit",
  "conflict",
  "unprocessable_entity",
]);

export const errorCodeToHttpStatus: Record<
  z.infer<typeof ErrorCode>,
  number
> = {
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  exceeded_limit: 403,
  not_found: 404,
  conflict: 409,
  invite_pending: 409,
  invite_expired: 410,
  unprocessable_entity: 422,
  too_many_requests: 429,
  internal_server_error: 500,
};

type InputError = { field: string; message: string };

type HttpErrorOptions = {
  message: string;
  code: z.infer<typeof ErrorCode>;
  errors?: InputError[];
};

export class HttpError extends Error {
  public readonly code: z.infer<typeof ErrorCode>;
  public readonly errors?: InputError[];

  constructor({ message, code, errors }: HttpErrorOptions) {
    super(message);
    this.code = code;
    this.errors = errors;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

type ErrorResponse = {
  status: "error";
  message: string;
  errors?: InputError[];
  statusCode: number;
};

export function handleServerError({
  err,
  meta,
}: {
  err: unknown;
  meta: Partial<RequestMeta>;
}): ErrorResponse {
  const log = logger.child(meta);

  let errorResponse: ErrorResponse = {
    status: "error",
    message: "Ooops something went wrong. Please contact customer support.",
    statusCode: 500,
  };

  if (err instanceof HttpError) {
    log.warn({
      message: err.message,
      errors: err.errors,
    });

    errorResponse = {
      status: "error",
      message: err.message,
      errors: err.errors,
      statusCode: errorCodeToHttpStatus[err.code],
    };

    return errorResponse;
  }

  log.error({
    message: "Unhandled Server Error",
    error: err,
    stack: err instanceof Error ? (err as Error).stack : undefined,
  });

  return errorResponse;
}
