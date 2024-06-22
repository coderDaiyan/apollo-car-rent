"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const appError_1 = require("../../errors/appError");
const timeToHour_1 = require("../../utils/timeToHour");
const bookings_model_1 = __importDefault(require("../bookings/bookings.model"));
const users_model_1 = __importDefault(require("../users/users.model"));
const cars_model_1 = __importDefault(require("./cars.model"));
const createCarIntoDB = async (payload) => {
    const result = await cars_model_1.default.create(payload);
    return result;
};
const getAllCarsFromDB = async () => {
    const result = await cars_model_1.default.find({});
    return result;
};
const getACarFromDB = async (_id) => {
    const result = await cars_model_1.default.find({ _id });
    return result;
};
const updateACarFromDB = async (_id, payload) => {
    const result = await cars_model_1.default.findByIdAndUpdate(_id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};
const returnACarFromBooking = async (payload, token) => {
    if (!token) {
        throw new appError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    const { userId } = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
    // check if user exists
    const ifUserExists = await users_model_1.default.ifUserExistsById(userId);
    if (!ifUserExists) {
        throw new appError_1.AppError(http_status_1.default.UNAUTHORIZED, 'User not found');
    }
    const booking = (await bookings_model_1.default.findOne({
        _id: payload.bookingId,
    }));
    const updatedCar = await cars_model_1.default.findOneAndUpdate({ _id: booking.car }, {
        $set: {
            status: 'available',
        },
    }, { new: true });
    const startTime = (0, timeToHour_1.timeToHour)(booking?.startTime);
    const endTime = (0, timeToHour_1.timeToHour)(payload?.endTime);
    const duration = endTime - startTime;
    const totalCost = duration * updatedCar?.pricePerHour;
    const updatedBooking = await bookings_model_1.default.findOneAndUpdate({ _id: booking._id }, {
        $set: {
            endTime: payload.endTime,
            totalCost,
        },
    }, { new: true }).populate(['user', 'car']);
    return updatedBooking;
};
const deleteACarFromDB = async (_id) => {
    const result = await cars_model_1.default.findByIdAndUpdate({ _id }, {
        $set: {
            isDeleted: true,
        },
    }, { new: true });
    return result;
};
exports.CarServices = {
    createCarIntoDB,
    getAllCarsFromDB,
    getACarFromDB,
    updateACarFromDB,
    deleteACarFromDB,
    returnACarFromBooking,
};
