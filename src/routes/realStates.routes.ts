import { Router } from "express";
import {
  createRealEstateController,
  listAllRealEstatesController,
} from "../controllers/realStates.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { createRealEstateSchema } from "../schemas/adresses.schemas";

const realEstatesRoutes: Router = Router();

realEstatesRoutes.post(
  "",
  ensureDataIsValidMiddleware(createRealEstateSchema),
  ensureTokenIsValidMiddleware,
  createRealEstateController
);
realEstatesRoutes.get("", listAllRealEstatesController);

export { realEstatesRoutes };
