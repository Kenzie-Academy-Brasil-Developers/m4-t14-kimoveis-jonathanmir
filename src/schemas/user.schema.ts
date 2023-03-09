import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().optional().default(false),
  password: z.string(),
});

const returnUserSchema = createUserSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

const createLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const updateUserSchema = z.object({
  name: z.string().max(45).optional(),
  email: z.string().email().max(45).optional(),
  password: z.string().optional(),
});

const returnUserWithoutPassword = returnUserSchema.omit({ password: true });
const userListSchema = z.array(returnUserWithoutPassword);
export {
  createUserSchema,
  returnUserSchema,
  returnUserWithoutPassword,
  createLoginSchema,
  updateUserSchema,
  userListSchema,
};
