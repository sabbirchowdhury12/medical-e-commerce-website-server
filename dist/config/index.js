"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
const pnv = process.env;
exports.default = {
    env: pnv.NODE_ENV,
    port: pnv.PORT,
    database_url: pnv.DATABASE_URL,
    bcrypt_salt_rounds: pnv.BCRYPT_SALT_ROUNDS,
    jwt: {
        secret: pnv.JWT_SECRET,
        expires_in: pnv.JWT_EXPIRES_IN,
        refresh_secret: pnv.JWT_REFRESH_SECRET,
        refresh_expires_in: pnv.JWT_REFRESH_EXPIRES_IN,
    },
};
