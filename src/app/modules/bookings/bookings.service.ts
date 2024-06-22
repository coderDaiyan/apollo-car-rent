import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { AppError } from '../../errors/appError';
import Car from '../cars/cars.model';
import User from '../users/users.model';
import { TBookingInput } from './bookings.interface';
import Booking from './bookings.model';

const createBookingIntoDB = async (payload: TBookingInput, token: string) => {
  const { userId } = jwt.verify(
    token,
    config.jwt_secret as string,
  ) as JwtPayload;

  // check if user exists
  const ifUserExists = await User.ifUserExistsById(userId);
  if (!ifUserExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
  }

  // check if car exists
  const ifCarExists = await Car.findOne({ _id: payload.carId });
  if (!ifCarExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Car is not valid');
  }

  const newBooking = {
    date: payload.date,
    startTime: payload.startTime,
    car: payload.carId,
    user: userId,
  };

  const result = (await Booking.create(newBooking)).populate(['user', 'car']);
  return result;
};

const getAllBookingsFromDB = async (query: Record<string, string>) => {
  const { carId, date } = query;
  const result = await Booking.find({ _id: carId, date });
  return result;
};

const getMyBookingFromDB = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }

  const { userId } = jwt.verify(
    token,
    config.jwt_secret as string,
  ) as JwtPayload;

  // check if user exists
  const ifUserExists = await User.ifUserExistsById(userId);
  if (!ifUserExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
  }

  const result = await Booking.find({ user: userId });
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getMyBookingFromDB,
};
