import { z } from "zod";
import {
  createRealEstateSchema,
  returnRealEstateSchema,
} from "../schemas/adresses.schemas";

type iRealEstateRequest = z.infer<typeof createRealEstateSchema>;
type iRealEstateReturn = z.infer<typeof returnRealEstateSchema>;
export { iRealEstateRequest, iRealEstateReturn };
