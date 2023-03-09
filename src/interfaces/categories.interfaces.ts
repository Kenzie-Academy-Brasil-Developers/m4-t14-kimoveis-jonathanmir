import { z } from "zod";
import {
  categoriesRequestSchema,
  categoriesReturnSchema,
} from "../schemas/categories.schemas";

type iCategoryRequest = z.infer<typeof categoriesRequestSchema>;
type iCategoryReturn = z.infer<typeof categoriesReturnSchema>;

export { iCategoryRequest, iCategoryReturn };
