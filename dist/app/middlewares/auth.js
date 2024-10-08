"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const jwt_1 = require("../../helper/jwt");
function auth(...requiredRoles) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            // Get authorization token
            const token = req.headers.authorization;
            if (!token) {
                throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
            }
            // Verify token
            const verifiedUser = (0, jwt_1.verifyToken)(token, config_1.default.jwt.secret);
            if (!verifiedUser) {
                throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid token or token verification failed!');
            }
            // Set user information in req
            req.user = verifiedUser;
            // Role-based access control
            if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
                throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = auth;
