import { z } from 'zod';

const BookingValidationSchema = z.object({
  date: z.string(),
  user: z.string().optional(),
  car: z.string().optional(),
  startTime: z.string(),
  endTime: z.string().or(z.null()).default(null),
  totalCost: z.number().default(0),
});

export const BookingValidation = { BookingValidationSchema };
