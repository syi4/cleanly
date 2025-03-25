import { z } from "zod";

const spaceSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(3, { message: "Must be at least 3 characters" })
    .max(100),
  creatorId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type spaceDTO = z.infer<typeof spaceSchema>;

export const createSpaceClientSchema = spaceSchema
  .pick({ name: true })
  .strict();
export type CreateSpaceClientInput = z.infer<typeof createSpaceClientSchema>;

export const createSpaceServerSchema = spaceSchema
  .pick({ name: true, creatorId: true })
  .strict();
export type CreateSpaceServerInput = z.infer<typeof createSpaceServerSchema>;
