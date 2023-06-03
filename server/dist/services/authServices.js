"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const logger_1 = __importDefault(require("../utils/logger"));
const environment_1 = __importDefault(require("../utils/environment"));
const errorHandler_1 = require("../utils/errorHandler");
const serviceName = 'authServices';
/**
 * Register a new user
 * @param user
 * @returns Promise containing the created user
 */
const registerUser = async (user) => {
    logger_1.default.debug(`${serviceName}: Creating user ${user}`);
    const createdUser = await User_1.default.create(user);
    return sendTokenResponse(createdUser);
};
exports.registerUser = registerUser;
/**
 * Login a user
 * @param email
 * @param password
 * @returns Promise containing the user and the token
 */
const loginUser = async (email, password) => {
    // Check for user
    const user = await User_1.default.findOne({ email }).select('+password');
    if (!user) {
        throw new errorHandler_1.AppError('Invalid credentials', 'Invalid credentials', 401);
    }
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new errorHandler_1.AppError('Invalid credentials', 'Invalid credentials', 401);
    }
    return sendTokenResponse(user);
};
exports.loginUser = loginUser;
/**
 * Get token from model, create cookie and send response
 * @param user
 * @returns Promise containing the user and the token (with options)
 */
const sendTokenResponse = (user) => {
    // Create token
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(
        // Expire in 30 days (in milliseconds)
        Date.now() + environment_1.default.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false
    };
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    return { user, token, options };
};
