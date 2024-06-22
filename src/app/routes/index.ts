import { Router } from 'express';
import AuthRouter from '../modules/auth/auth.route';
import bookingRouter from '../modules/bookings/bookings.route';
import carRouter from '../modules/cars/cars.route';

const router = Router();

const paths = [
  {
    path: '/bookings',
    route: bookingRouter,
  },
  {
    path: '/users',
    route: carRouter,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/cars',
    route: carRouter,
  },
];

paths.map((path) => router.use(path.path, path.route));

export default router;
