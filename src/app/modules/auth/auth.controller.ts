import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthServices.signUpUser(data);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User created successfully',
    data: result,
  });
});

const signInUser = catchAsync(async (req: Request, res: Response) => {
  const { user, token } = await AuthServices.signInUser(req.body);
  res.status(httpStatus.OK).send({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: user,
    token,
  });
});

export const AuthControllers = {
  signUpUser,
  signInUser,
};
