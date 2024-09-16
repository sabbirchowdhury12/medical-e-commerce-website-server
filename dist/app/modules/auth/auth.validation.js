"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = exports.ZRegister = exports.ZLogin = void 0;
const zod_1 = require("zod");
exports.ZLogin = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required!' }).email(),
        password: zod_1.z.string({ required_error: 'Password is required!' }),
    }),
});
exports.ZRegister = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required!' }),
        email: zod_1.z.string({ required_error: 'Email is required!' }).email(),
        password: zod_1.z.string({ required_error: 'Password is required!' }),
        image: zod_1.z.string().optional(),
    }),
});
exports.AuthValidation = {
    ZRegister: exports.ZRegister,
    ZLogin: exports.ZLogin,
};
