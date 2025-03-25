import { type Prisma, type Session, prisma } from "@repo/prisma";

export async function createSession(
  data: Prisma.SessionCreateInput,
): Promise<Session> {
  const session = await prisma.session.create({
    data,
  });

  return session;
}

export async function getSession(
  where: Prisma.SessionWhereUniqueInput,
): Promise<Session | null> {
  const session = await prisma.session.findUnique({
    where,
  });

  return session;
}

export async function deleteSession(
  where: Prisma.SessionWhereUniqueInput,
): Promise<void> {
  await prisma.session.delete({
    where,
  });
}
