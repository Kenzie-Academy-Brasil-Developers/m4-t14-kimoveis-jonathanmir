import {
  createLoginSchema,
  createUserSchema,
  returnUserWithoutPassword,
} from "../schemas/user.schema";
import z from "zod";
import { DeepPartial } from "typeorm";

type iUserRequest = z.infer<typeof createUserSchema>;
type iUserReturn = z.infer<typeof returnUserWithoutPassword>;
type iUserPatchable = DeepPartial<iUserRequest>;
type iUserLogin = z.infer<typeof createLoginSchema>;

export { iUserRequest, iUserReturn, iUserPatchable, iUserLogin };
