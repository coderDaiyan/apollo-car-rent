/* eslint-disable @typescript-eslint/ban-types */
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { Document, Types } from 'mongoose';
import config from '../../config';
import { AppError } from '../../errors/appError';
import { TUser } from '../users/users.interface';
import User from '../users/users.model';

type jwtPayload = Document<unknown, {}, TUser> &
  TUser & {
    _id: Types.ObjectId;
  };

const signUpUser = async (payload: TUser) => {
  if (await User.ifUserExists(payload.email)) {
    throw new Error('User already exists');
  }
  const result = await User.create(payload);
  return result;
};

const signInUser = async (payload: Record<string, string>) => {
  const { email, password } = payload;
  // check if user exists
  const user = (await User.ifUserExists(email)) as jwtPayload;
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'User not found!');
  }

  // check password
  if (!(await User.checkPasswordMatch(password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match !');
  }
  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };
  const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: config.jwt_expiry as string,
  });

  return { user, token };
};

export const AuthServices = {
  signUpUser,
  signInUser,
};
