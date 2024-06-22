import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarServices } from './cars.service';

const createCar = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await CarServices.createCarIntoDB(data);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Car created successfully',
    data: result,
  });
});

const getAllCars = catchAsync(async (req: Request, res: Response) => {
  const result = await CarServices.getAllCarsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cars retrieved successfully',
    data: result,
  });
});

const getACar = catchAsync(async (req: Request, res: Response) => {
  const result = await CarServices.getACarFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A Car retrieved successfully',
    data: result,
  });
});

const updateACar = catchAsync(async (req: Request, res: Response) => {
  const result = await CarServices.updateACarFromDB(req.params.id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car updated successfully',
    data: result,
  });
});

const deleteACar = catchAsync(async (req: Request, res: Response) => {
  const result = await CarServices.deleteACarFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car Deleted successfully',
    data: result,
  });
});

const returnACar = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers['authorization']?.split(' ')[1] || '';

  const result = await CarServices.returnACarFromBooking(req.body, token);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car Returned successfully',
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCars,
  getACar,
  updateACar,
  deleteACar,
  returnACar,
};
