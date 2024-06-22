import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import config from '../../config';
import { AppError } from '../../errors/appError';
import { timeToHour } from '../../utils/timeToHour';
import { TBooking } from '../bookings/bookings.interface';
import Booking from '../bookings/bookings.model';
import User from '../users/users.model';
import { TCar } from './cars.interface';
import Car from './cars.model';

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};

const getAllCarsFromDB = async () => {
  const result = await Car.find({});
  return result;
};

const getACarFromDB = async (_id: string) => {
  const result = await Car.find({ _id });
  return result;
};

const updateACarFromDB = async (_id: string, payload: Partial<TCar>) => {
  // check if car exists
  const car = await Car.findOne({ _id });
  if (!car) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Car is not valid');
  }
  const result = await Car.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const returnACarFromBooking = async (
  payload: Record<string, string>,
  token: string,
) => {
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

  const booking = (await Booking.findOne({
    _id: payload.bookingId,
  })) as TBooking & {
    _id: Types.ObjectId;
  };

  const updatedCar = await Car.findOneAndUpdate(
    { _id: booking.car },
    {
      $set: {
        status: 'available',
      },
    },
    { new: true },
  );

  const startTime = timeToHour(booking?.startTime as string);
  const endTime = timeToHour(payload?.endTime);

  const duration = endTime - startTime;

  const totalCost = duration * (updatedCar?.pricePerHour as number);

  const updatedBooking = await Booking.findOneAndUpdate(
    { _id: booking._id },
    {
      $set: {
        endTime: payload.endTime,
        totalCost,
      },
    },
    { new: true },
  ).populate(['user', 'car']);
  return updatedBooking;
};

const deleteACarFromDB = async (_id: string) => {
  // check if car exists
  const car = await Car.findOne({ _id });
  if (!car) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Car is not valid');
  }
  const result = await Car.findByIdAndUpdate(
    _id,
    {
      $set: {
        isDeleted: true,
      },
    },
    { new: true },
  );
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getACarFromDB,
  updateACarFromDB,
  deleteACarFromDB,
  returnACarFromBooking,
};
