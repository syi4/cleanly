import { z } from "zod";

const emailSchema = z
  .string()
  .email()
  .max(255, { message: "Email is too long" });

const passwordSchema = z.string().max(255, { message: "Password is too long" });

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Full name is too short" })
      .max(100, { message: "Full name is too long" }),
    email: emailSchema,
    password: passwordSchema
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password must contain at least one number, one uppercase, and one lowercase letter",
      ),
  })
  .extend({
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const logInSchema = z.object({
  email: emailSchema,
  password: passwordSchema.min(1, "Password required"),
});
