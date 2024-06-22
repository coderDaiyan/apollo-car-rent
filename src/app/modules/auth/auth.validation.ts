import { z } from 'zod';

const signInValidationSchema = z.object({
  id: z.string({
    required_error: 'ID is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
});

const signUpValidationSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.enum(['user', 'admin']),
  password: z.string(),
  phone: z.string(),
  address: z.string(),
});

export const AuthValidation = {
  signInValidationSchema,
  signUpValidationSchema,
};
