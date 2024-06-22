import { z } from 'zod';

const BookingValidationSchema = z.object({
  date: z.string(),
  user: z.string().optional(),
  car: z.string().optional(),
  startTime: z.date(),
  endTime: z.date().or(z.null()).default(null),
  totalCost: z.number().default(0),
});

export const BookingValidation = { BookingValidationSchema };
