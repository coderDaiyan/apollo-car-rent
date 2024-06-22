"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const appError_1 = require("../errors/appError");
const users_model_1 = __importDefault(require("../modules/users/users.model"));
const catchAsync_1 = require("../utils/catchAsync");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1] || '';
        if (!token) {
            throw new appError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        const decodedData = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        const { userId, role } = decodedData;
        // check if user exists
        const ifUserExists = await users_model_1.default.ifUserExistsById(userId);
        if (!ifUserExists) {
            throw new appError_1.AppError(http_status_1.default.UNAUTHORIZED, 'User not found');
        }
        if ((requiredRoles && requiredRoles.includes(role)) === false) {
            throw new appError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
        }
        req.user = decodedData;
        next();
    });
};
exports.default = auth;
