import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CarControllers } from './cars.controller';
import { CarValidation } from './cars.validation';

const carRouter = Router();

carRouter.post(
  '/',
  [auth('admin'), validateRequest(CarValidation.CarValidationSchema)],
  CarControllers.createCar,
);
carRouter.get('/', CarControllers.getAllCars);
carRouter.get('/:id', CarControllers.getACar);
carRouter.put('/return', auth('admin'), CarControllers.returnACar);
carRouter.put(
  '/:id',
  [auth('admin'), validateRequest(CarValidation.CarUpdateValidationSchema)],
  CarControllers.updateACar,
);
carRouter.delete('/:id', auth('admin'), CarControllers.deleteACar);

export default carRouter;
