import { NextFunction, Request, Response } from "express";
import createScheduleService from "../services/schedules/createSchedule.service";
import listRealEstateScheduleService from "../services/schedules/listSchedules.service";

const createScheduleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await createScheduleService(req.body, req.user.id);
  return res.status(201).send({ message: "Schedule created" });
};

const listRealEstateSchedulesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await listRealEstateScheduleService(
    parseInt(req.params.id),
    req.user.admin
  );
  return res.status(200).send(data);
};
export { createScheduleController, listRealEstateSchedulesController };
