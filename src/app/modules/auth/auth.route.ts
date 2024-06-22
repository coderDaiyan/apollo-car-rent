import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

const AuthRouter = Router();

AuthRouter.post(
  '/signup',
  validateRequest(AuthValidation.signUpValidationSchema),
  AuthControllers.signUpUser,
);
AuthRouter.post(
  '/signin',
  validateRequest(AuthValidation.signInValidationSchema),
  AuthControllers.signInUser,
);

export default AuthRouter;
