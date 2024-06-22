"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidation = void 0;
const zod_1 = require("zod");
const CarValidationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    color: zod_1.z.string(),
    isElectric: zod_1.z.boolean(),
    features: zod_1.z.string().array(),
    pricePerHour: zod_1.z.number(),
    status: zod_1.z.enum(['available', 'unavailable']).default('available'),
    isDeleted: zod_1.z.boolean().default(false),
});
const CarUpdateValidationSchema = CarValidationSchema.partial();
exports.CarValidation = {
    CarValidationSchema,
    CarUpdateValidationSchema,
};
