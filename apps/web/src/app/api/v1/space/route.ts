import { type Prisma, UserRole } from "@prisma/client";

import { type NextRequest, NextResponse } from "next/server";

import {
  type CreateSpaceServerInput,
  createSpaceServerSchema,
} from "~/common/schemas/space";
import { createSpace } from "~/db/space";
import { createUserSpaceRole } from "~/db/userSpaceRole";
import {
  serializeErrorResponse,
  serializeSuccessResponse,
} from "~/lib/client/api";
import { handleServerError } from "~/server/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const body: CreateSpaceServerInput = await req.json();

    if (session?.user.id !== body.creatorId) {
      const response = serializeErrorResponse("Forbidden");
      return NextResponse.json(response, { status: 403 });
    }

    const parsed = createSpaceServerSchema.safeParse(body);

    if (!parsed.success) {
      // handle the zod errors server
      const response = serializeErrorResponse("Validation error");
      return NextResponse.json(response, { status: 400 });
    }

    const spaceData: Prisma.SpaceCreateInput = {
      name: body.name.toLowerCase(),
      creator: { connect: { id: body.creatorId } },
      users: { connect: { id: body.creatorId } },
    };

    const newSpace = await createSpace(spaceData);

    const userSpaceRoleData: Prisma.UserSpaceRoleCreateInput = {
      role: UserRole.ADMIN,
      user: { connect: { id: newSpace.creatorId } },
      space: { connect: { id: newSpace.id } },
    };

    await createUserSpaceRole(userSpaceRoleData);

    const response = serializeSuccessResponse(
      "Space successfully created",
      newSpace,
    );
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return handleServerError(err);
  }
}
