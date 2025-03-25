import { type Prisma, prisma } from "@repo/prisma";

export const createUserSpaceRole = async (
  data: Prisma.UserSpaceRoleCreateInput,
) => {
  const newUserSpaceRole = await prisma.userSpaceRole.create({ data });

  return newUserSpaceRole;
};
