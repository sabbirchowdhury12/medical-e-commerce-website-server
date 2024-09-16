"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const auth_constant_1 = require("./auth.constant");
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: auth_constant_1.role, default: 'customer' },
}, { timestamps: true, versionKey: false });
exports.User = mongoose_1.default.model('User', UserSchema);
