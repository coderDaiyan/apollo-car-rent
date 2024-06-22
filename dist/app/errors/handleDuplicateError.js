"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const msg = match && match[1];
    const errorMessages = [
        {
            path: err.path,
            message: `${msg} is already exists!`,
        },
    ];
    const statusCode = 400;
    return {
        errorMessages,
        message: 'Invalid ID',
        statusCode,
    };
};
exports.default = handleDuplicateError;
