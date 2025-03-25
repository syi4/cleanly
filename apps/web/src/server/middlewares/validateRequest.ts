import type { ZodIssue, ZodSchema } from "@repo/zod";
import { type NextRequest, NextResponse } from "next/server";

import { HttpError } from "../lib/errors";

function formatZodError(
  issues: ZodIssue[],
): { field: string; message: string }[] {
  return issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));
}

export async function validateRequest<T>(req: NextRequest, schema: ZodSchema) {
  let body: T;

  try {
    body = await req.json();
  } catch (err) {
    throw new HttpError({
      message: "Invalid JSON format.",
      code: "bad_request",
    });
  }

  const result = schema.safeParse(body);

  if (!result.success) {
    const errors = formatZodError(result.error.issues);
    throw new HttpError({
      message: "Input validation failed.",
      code: "bad_request",
      errors,
    });
  }

  return body;
}
