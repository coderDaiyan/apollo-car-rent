"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
/* eslint-disable @typescript-eslint/ban-types */
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const appError_1 = require("../../errors/appError");
const users_model_1 = __importDefault(require("../users/users.model"));
const signUpUser = async (payload) => {
    if (await users_model_1.default.ifUserExists(payload.email)) {
        throw new Error('User already exists');
    }
    const result = await users_model_1.default.create(payload);
    return result;
};
const signInUser = async (payload) => {
    const { email, password } = payload;
    // check if user exists
    const user = (await users_model_1.default.ifUserExists(email));
    if (!user) {
        throw new appError_1.AppError(http_status_1.default.FORBIDDEN, 'User not found!');
    }
    // check password
    if (!(await users_model_1.default.checkPasswordMatch(password, user.password))) {
        throw new appError_1.AppError(http_status_1.default.FORBIDDEN, 'Password does not match !');
    }
    const jwtPayload = {
        userId: user._id,
        role: user.role,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_secret, {
        expiresIn: config_1.default.jwt_expiry,
    });
    return { user, token };
};
exports.AuthServices = {
    signUpUser,
    signInUser,
};
