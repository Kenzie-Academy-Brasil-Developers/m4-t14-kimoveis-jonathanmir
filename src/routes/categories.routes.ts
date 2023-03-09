import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listRealStatesFromCategoriesController,
} from "../controllers/categories.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { categoriesRequestSchema } from "../schemas/categories.schemas";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureDataIsValidMiddleware(categoriesRequestSchema),
  ensureTokenIsValidMiddleware,
  createCategoryController
);
categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.get("/:id/realEstate", listRealStatesFromCategoriesController);

export { categoriesRoutes };
