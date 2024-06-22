"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const cars_service_1 = require("./cars.service");
const createCar = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = req.body;
    const result = await cars_service_1.CarServices.createCarIntoDB(data);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Car created successfully',
        data: result,
    });
});
const getAllCars = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await cars_service_1.CarServices.getAllCarsFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Cars retrieved successfully',
        data: result,
    });
});
const getACar = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await cars_service_1.CarServices.getACarFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'A Car retrieved successfully',
        data: result,
    });
});
const updateACar = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await cars_service_1.CarServices.updateACarFromDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Car updated successfully',
        data: result,
    });
});
const deleteACar = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await cars_service_1.CarServices.deleteACarFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Car Deleted successfully',
        data: result,
    });
});
const returnACar = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1] || '';
    const result = await cars_service_1.CarServices.returnACarFromBooking(req.body, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Car Returned successfully',
        data: result,
    });
});
exports.CarControllers = {
    createCar,
    getAllCars,
    getACar,
    updateACar,
    deleteACar,
    returnACar,
};
