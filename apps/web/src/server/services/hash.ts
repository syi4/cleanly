import bcrypt from "bcryptjs";

export async function generateHash(value: string, saltRounds = 10) {
  const hash = await bcrypt.hash(value, saltRounds);
  return hash;
}

export async function verifyHash(value: string, hash: string) {
  const valid = await bcrypt.compare(value, hash);
  return valid;
}
