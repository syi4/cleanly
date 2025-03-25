import { type Prisma, type User, prisma } from "@repo/prisma";
import { HttpError } from "../lib/errors";
import { verifyHash } from "./hash";

type UserDTO = Omit<User, "email" | "hash">;

export async function createUser(
  data: Prisma.UserCreateInput,
): Promise<UserDTO> {
  const user = await prisma.user.create({
    data,
  });

  return user;
}

export async function getUser(
  where: Prisma.UserWhereUniqueInput,
): Promise<UserDTO | null> {
  const user = await prisma.user.findUnique({
    where,
  });

  return user;
}

export async function verifyUserPasswordOrThrow({
  email,
  password,
}: { email: string; password: string }): Promise<Pick<User, "id">> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      hash: true,
    },
  });

  if (!user) {
    throw new HttpError({
      code: "bad_request",
      message: "Invalid email or password.",
    });
  }

  const valid = await verifyHash(password, user.hash);

  if (!valid) {
    throw new HttpError({
      code: "bad_request",
      message: "Invalid email or password.",
    });
  }

  return user;
}
