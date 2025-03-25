import type { Prisma } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

import { handleServerError } from "~/server/lib/errors";
import { getUserWithPods } from "~/server/services/user";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;

  try {
    const where: Prisma.UserWhereUniqueInput = {
      id,
    };

    const user = await getUserWithPods(where);

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (err) {
    return handleServerError(err);
  }
}
