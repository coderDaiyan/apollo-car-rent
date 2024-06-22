import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../errors/appError';
import { TUserRoles } from '../modules/users/users.interface';
import User from '../modules/users/users.model';
import { catchAsync } from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1] || '';

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decodedData = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;

    const { userId, role } = decodedData;

    // check if user exists
    const ifUserExists = await User.ifUserExistsById(userId);
    if (!ifUserExists) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
    }

    if ((requiredRoles && requiredRoles.includes(role)) === false) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = decodedData as JwtPayload;
    next();
  });
};

export default auth;
