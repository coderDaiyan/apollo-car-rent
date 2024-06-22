"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, resData) => {
    const { statusCode, success, message, data } = resData;
    res.status(statusCode).json({
        success: success,
        statusCode: statusCode,
        message: message,
        data: data,
    });
};
exports.default = sendResponse;
