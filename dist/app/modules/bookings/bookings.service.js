"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const appError_1 = require("../../errors/appError");
const cars_model_1 = __importDefault(require("../cars/cars.model"));
const users_model_1 = __importDefault(require("../users/users.model"));
const bookings_model_1 = __importDefault(require("./bookings.model"));
const createBookingIntoDB = async (payload, token) => {
    const { userId } = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
    // check if user exists
    const ifUserExists = await users_model_1.default.ifUserExistsById(userId);
    if (!ifUserExists) {
        throw new appError_1.AppError(http_status_1.default.UNAUTHORIZED, 'User not found');
    }
    // check if car exists
    const ifCarExists = await cars_model_1.default.findOne({ _id: payload.carId });
    if (!ifCarExists) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'Car is not valid');
    }
    const newBooking = {
        date: payload.date,
        startTime: payload.startTime,
        car: payload.carId,
        user: userId,
    };
    const result = (await bookings_model_1.default.create(newBooking)).populate(['user', 'car']);
    return result;
};
const getAllBookingsFromDB = async (query) => {
    const { carId, date } = query;
    const result = await bookings_model_1.default.find({ _id: carId, date });
    return result;
};
const getMyBookingFromDB = async (token) => {
    if (!token) {
        throw new appError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    const { userId } = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
    // check if user exists
    const ifUserExists = await users_model_1.default.ifUserExistsById(userId);
    if (!ifUserExists) {
        throw new appError_1.AppError(http_status_1.default.UNAUTHORIZED, 'User not found');
    }
    const result = await bookings_model_1.default.find({ user: userId });
    return result;
};
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getMyBookingFromDB,
};
