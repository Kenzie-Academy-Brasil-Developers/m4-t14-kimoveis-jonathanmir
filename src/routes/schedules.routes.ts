import {
  createScheduleController,
  listRealEstateSchedulesController,
} from "../controllers/schedules.controllers";
import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { scheduleRequestSchema } from "../schemas/schedules.schemas";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";

const schedulesRoutes: Router = Router();
schedulesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(scheduleRequestSchema),
  createScheduleController
);
schedulesRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  listRealEstateSchedulesController
);

export default schedulesRoutes;
