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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("../../../helper/bcrypt");
const auth_model_1 = require("./auth.model");
const profile_model_1 = require("../profile/profile.model");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const jwt_1 = require("../../../helper/jwt");
const login = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, }) {
    // Find the user by email
    const user = yield auth_model_1.User.findOne({ email });
    if (!user)
        throw new apiError_1.default(404, "User doesn't exist!");
    // Compare the provided password with the hashed password in the database
    const isPasswordMatched = yield (0, bcrypt_1.matchPassword)(password, user.password);
    if (!isPasswordMatched)
        throw new apiError_1.default(401, 'Password is incorrect!');
    // Extract the necessary details for token generation
    const { _id: id, role } = user;
    const profile = yield profile_model_1.Profile.findOne({ userId: id });
    if (!profile)
        throw new apiError_1.default(404, "Profile doesn't exist!");
    // Generate tokens
    const accessToken = (0, jwt_1.createToken)({ id, role }, 'access');
    const refreshToken = (0, jwt_1.createToken)({ id, role }, 'refresh');
    return { user: profile, accessToken, refreshToken };
});
const register = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { email, password } = _a, others = __rest(_a, ["email", "password"]);
    password = yield (0, bcrypt_1.hashPassword)(password);
    // Check if the environment supports transactions
    const isReplicaSet = process.env.REPLICA_SET === 'true'; // or another method to detect if using a replica set
    let session;
    if (isReplicaSet) {
        session = yield (0, mongoose_1.startSession)();
        session.startTransaction();
    }
    try {
        const user = yield auth_model_1.User.create([{ email, password }], session ? { session } : {});
        console.log(user);
        console.log(user[0]);
        const profile = yield profile_model_1.Profile.create([Object.assign({ userId: user[0]._id }, others)], session ? { session } : {});
        console.log(profile);
        if (!user[0] || !profile[0])
            throw new apiError_1.default(400, 'Failed to create user!', '');
        // Commit the transaction if session exists
        if (session) {
            yield session.commitTransaction();
            session.endSession();
        }
        // Extract user details
        const { _id: id, role } = user[0];
        // Generate tokens
        const accessToken = (0, jwt_1.createToken)({ id, role }, 'access');
        const refreshToken = (0, jwt_1.createToken)({ id, role }, 'refresh');
        return { user: profile[0], accessToken, refreshToken };
    }
    catch (error) {
        // Abort the transaction if session exists
        if (session) {
            yield session.abortTransaction();
            session.endSession();
        }
        throw error;
    }
});
exports.AuthService = { register, login };
