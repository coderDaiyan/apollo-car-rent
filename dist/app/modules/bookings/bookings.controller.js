"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const bookings_service_1 = require("./bookings.service");
const createBooking = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1] || '';
    const data = req.body;
    const result = await bookings_service_1.BookingServices.createBookingIntoDB(data, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Booking created successfully',
        data: result,
    });
});
const getAllBookings = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { carId, date } = req.query;
    const result = await bookings_service_1.BookingServices.getAllBookingsFromDB({
        carId,
        date,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Bookings retrieved successfully',
        data: result,
    });
});
const getMyBooking = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1] || '';
    const result = await bookings_service_1.BookingServices.getMyBookingFromDB(token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'A Booking retrieved successfully',
        data: result,
    });
});
exports.BookingControllers = {
    createBooking,
    getAllBookings,
    getMyBooking,
};
