import { z } from "zod";

const scheduleRequestSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

export { scheduleRequestSchema };
