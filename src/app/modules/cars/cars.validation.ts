import { z } from 'zod';

const CarValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  color: z.string(),
  isElectric: z.boolean(),
  features: z.string().array(),
  pricePerHour: z.number(),
  status: z.enum(['available', 'unavailable']).default('available'),
  isDeleted: z.boolean().default(false),
});

const CarUpdateValidationSchema = CarValidationSchema.partial();
export const CarValidation = {
  CarValidationSchema,
  CarUpdateValidationSchema,
};
