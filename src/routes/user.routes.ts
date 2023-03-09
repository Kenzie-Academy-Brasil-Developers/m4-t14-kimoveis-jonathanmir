import { Router } from "express";
import { createUserController } from "../controllers";
import {
  listUsersController,
  removeUserController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureEmailAvailableMiddleware from "../middlewares/ensureEmailAvailable.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserExistsMiddleware from "../middlewares/ensureUserExists.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

const userRoutes: Router = Router();
userRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserSchema),
  ensureEmailAvailableMiddleware,
  createUserController
);
userRoutes.delete(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  removeUserController
);

userRoutes.get("", ensureTokenIsValidMiddleware, listUsersController);
userRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateUserSchema),
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  updateUserController
);

export { userRoutes };
