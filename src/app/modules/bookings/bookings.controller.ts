import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './bookings.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1] || '';
  const data = req.body;

  const result = await BookingServices.createBookingIntoDB(data, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const { carId, date } = req.query;
  const result = await BookingServices.getAllBookingsFromDB({
    carId,
    date,
  } as Record<string, string>);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getMyBooking = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1] || '';
  const result = await BookingServices.getMyBookingFromDB(token);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A Booking retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getMyBooking,
};
