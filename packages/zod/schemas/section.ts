import { SectionType } from "@prisma/client";
import { z } from "zod";

const formatInputToEnum = (input: string): SectionType | undefined => {
  const formattedInput = input
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .toUpperCase(); // Make sure it's uppercase for Prisma enum

  return SectionType[formattedInput as keyof typeof SectionType];
};

const sectionSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(3, { message: "Must be at least 3 characters" })
    .max(100, { message: "Can't exceed 100 characters" }),
  description: z.string().max(255).optional(),
  type: z.nativeEnum(SectionType),
  creatorId: z.string().uuid(),
  podId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type SectionDTO = z.infer<typeof sectionSchema>;

export const createSectionClientSchema = sectionSchema
  .pick({ name: true, description: true, type: true })
  .strict();
export type CreateSectionClientInput = z.infer<
  typeof createSectionClientSchema
>;

export const createSectionServerSchema = sectionSchema
  .pick({
    name: true,
    description: true,
    type: true,
    creatorId: true,
    podId: true,
  })
  .strict();
export type CreateSectionServerInput = z.infer<
  typeof createSectionServerSchema
>;
