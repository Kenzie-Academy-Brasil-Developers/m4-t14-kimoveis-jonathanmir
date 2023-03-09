import { z } from "zod";
import { scheduleRequestSchema } from "../schemas/schedules.schemas";

type iScheduleRequest = z.infer<typeof scheduleRequestSchema>;

export { iScheduleRequest };
