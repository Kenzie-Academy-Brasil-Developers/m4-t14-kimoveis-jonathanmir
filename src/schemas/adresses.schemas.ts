import { z, ZodUnion } from "zod";

const addressSchema = z.object({
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});
const returnAdressWithConcatenation = addressSchema.extend({
  completeAddress: z.string(),
});
const createRealEstateSchema = z.object({
  value: z.union([z.string(), z.number()]),
  size: z.number().gt(0),
  address: addressSchema,
  categoryId: z.number().nullish(),
});

const returnRealEstateSchema = createRealEstateSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  category: z
    .object({
      name: z.string(),
      id: z.number().optional(),
    })
    .nullish(),
  sold: z.boolean().default(false),
});
const realEstatesList = z.array(returnRealEstateSchema);
export {
  createRealEstateSchema,
  returnRealEstateSchema,
  returnAdressWithConcatenation,
  realEstatesList,
};
