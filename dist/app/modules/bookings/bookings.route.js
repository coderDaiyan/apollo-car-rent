"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bookings_controller_1 = require("./bookings.controller");
const bookings_validation_1 = require("./bookings.validation");
const bookingRouter = (0, express_1.Router)();
bookingRouter.post('/', [(0, auth_1.default)('user'), (0, validateRequest_1.default)(bookings_validation_1.BookingValidation.BookingValidationSchema)], bookings_controller_1.BookingControllers.createBooking);
bookingRouter.get('/', (0, auth_1.default)('admin'), bookings_controller_1.BookingControllers.getAllBookings);
bookingRouter.get('/my-bookings', (0, auth_1.default)('user'), bookings_controller_1.BookingControllers.getMyBooking);
exports.default = bookingRouter;
