"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const errorHandler_1 = require("./errorHandler");
const environment_1 = __importDefault(require("./environment"));
/**
 * Middleware to protect routes by checking if the user has a valid JWT in the request cookie.
 */
exports.protect = (0, express_async_handler_1.default)(async (req, res, next) => {
    let jwtToken;
    if (req.cookies && req.cookies.jwtToken) {
        jwtToken = req.cookies.jwtToken;
    }
    // Make sure token exists
    if (!jwtToken) {
        throw new errorHandler_1.AppError('Not authorized to access this route', 'Not authorized to access this route', 401);
    }
    try {
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(jwtToken, environment_1.default.JWT_SECRET);
        req.user = await User_1.default.findById(decoded.id);
        next();
    }
    catch (err) {
        throw new errorHandler_1.AppError('Not authorized to access this route', 'Not authorized to access this route', 401);
    }
});
