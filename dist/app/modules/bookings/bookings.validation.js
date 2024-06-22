"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const BookingValidationSchema = zod_1.z.object({
    date: zod_1.z.string(),
    user: zod_1.z.string().optional(),
    car: zod_1.z.string().optional(),
    startTime: zod_1.z.date(),
    endTime: zod_1.z.date().or(zod_1.z.null()).default(null),
    totalCost: zod_1.z.number().default(0),
});
exports.BookingValidation = { BookingValidationSchema };
