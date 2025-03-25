import {
  type Assignment,
  type Prisma,
  PrismaClient,
  type Section,
  type SectionType,
  type Session,
  type Space,
  type Task,
  type User,
  type UserSpaceRole,
} from "@prisma/client";

declare global {
  var _prisma:
    | PrismaClient<{
        omit: {
          user: { email: true; hash: true };
        };
      }>
    | undefined;
}

const globalForPrisma = global as unknown as {
  _prisma: PrismaClient<{
    omit: {
      user: { email: true; hash: true };
    };
  }>;
};

const prisma =
  globalForPrisma._prisma ||
  new PrismaClient({
    omit: {
      user: { email: true, hash: true },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma._prisma = prisma;

export { prisma };
export type {
  Assignment,
  Prisma,
  PrismaClient,
  Section,
  SectionType,
  Session,
  Space,
  Task,
  User,
  UserSpaceRole,
};
