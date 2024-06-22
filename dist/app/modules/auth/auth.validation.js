"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const signInValidationSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: 'email is required',
    }),
    password: zod_1.z.string({
        required_error: 'Password is required',
    }),
});
const signUpValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    role: zod_1.z.enum(['user', 'admin']),
    password: zod_1.z.string(),
    phone: zod_1.z.string(),
    address: zod_1.z.string(),
});
exports.AuthValidation = {
    signInValidationSchema,
    signUpValidationSchema,
};
