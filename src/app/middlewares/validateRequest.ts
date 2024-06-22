import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { err } = await schema.parseAsync(req.body);
      if (err) {
        next(err);
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
