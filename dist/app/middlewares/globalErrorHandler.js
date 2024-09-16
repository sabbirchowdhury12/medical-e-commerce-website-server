"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const apiError_1 = __importDefault(require("../../errors/apiError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const globalErrorHandler = (error, req, res, next) => {
    console.log('error name', error.name);
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages = [];
    if (error.name === 'ValidationError') {
        // Handle Mongoose validation errors
        statusCode = 400; // Bad Request
        message = 'Validation Error';
        errorMessages = Object.values(error.errors).map((err) => ({
            path: err.path,
            message: err.message,
        }));
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'validationError') {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode) || 400;
        message = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message) || 'Validation Error';
        errorMessages = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages) || [];
    }
    else if (error.name === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode) || 400;
        message = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message) || 'Cast Error';
        errorMessages = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages) || [];
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode) || 400;
        message = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message) || 'Zod Error';
        errorMessages = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages) || [];
    }
    else if (error instanceof apiError_1.default) {
        statusCode = (error === null || error === void 0 ? void 0 : error.statusCode) || 500;
        message = (error === null || error === void 0 ? void 0 : error.message) || 'API Error';
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = (error === null || error === void 0 ? void 0 : error.message) || 'Unknown Error';
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: process.env.NODE_ENV !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
