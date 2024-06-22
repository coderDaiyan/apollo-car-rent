"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            const { err } = await schema.parseAsync(req.body);
            if (err) {
                next(err);
            }
            else {
                next();
            }
        }
        catch (err) {
            next(err);
        }
    };
};
exports.default = validateRequest;
