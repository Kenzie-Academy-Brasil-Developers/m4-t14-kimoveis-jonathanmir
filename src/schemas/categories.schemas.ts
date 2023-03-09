import { z } from "zod";

const categoriesRequestSchema = z.object({
  name: z.string().max(45),
});

const categoriesReturnSchema = categoriesRequestSchema.extend({
  id: z.number(),
});
const categoriesListSchema = z.array(categoriesReturnSchema);
export {
  categoriesRequestSchema,
  categoriesReturnSchema,
  categoriesListSchema,
};
