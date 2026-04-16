import { z } from "zod";

export const userIdParamsSchema = z.object({
  id: z.string().uuid("User id must be a valid UUID"),
});

export const createUserSchema = z.object({
  name: z.string().min(1, "name is required").max(100, "name is too long"),
  email: z.string().email("email must be valid").max(255, "email is too long"),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().email().max(255).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field (name or email) must be provided",
  });
