import { type ZodIssue, type ZodSchema, z } from "zod";
import { logInSchema, signUpSchema } from "./schemas";

export default z;
export { logInSchema, signUpSchema };
export type { ZodIssue, ZodSchema };
