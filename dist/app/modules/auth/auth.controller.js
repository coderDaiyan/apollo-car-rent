"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const signUpUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = req.body;
    const result = await auth_service_1.AuthServices.signUpUser(data);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'User created successfully',
        data: result,
    });
});
const signInUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { user, token } = await auth_service_1.AuthServices.signInUser(req.body);
    res.status(http_status_1.default.OK).send({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User logged in successfully',
        data: user,
        token,
    });
});
exports.AuthControllers = {
    signUpUser,
    signInUser,
};
