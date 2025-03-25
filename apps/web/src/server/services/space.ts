import type { Prisma, Space } from "@prisma/client";
import prisma from ".";

export const createSpace = async (
  data: Prisma.SpaceCreateInput,
): Promise<Space> => {
  const space = await prisma.space.create({ data });

  return space;
};

export const getSpace = async (
  where: Prisma.SpaceWhereUniqueInput,
  include?: Prisma.SpaceInclude,
) => {
  const space = await prisma.space.findUnique({
    where,
    include,
  });

  return space;
};
