import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingControllers } from './bookings.controller';
import { BookingValidation } from './bookings.validation';

const bookingRouter = Router();

bookingRouter.post(
  '/',
  [auth('user'), validateRequest(BookingValidation.BookingValidationSchema)],
  BookingControllers.createBooking,
);
bookingRouter.get('/', auth('admin'), BookingControllers.getAllBookings);
bookingRouter.get(
  '/my-bookings',
  auth('user'),
  BookingControllers.getMyBooking,
);

export default bookingRouter;
