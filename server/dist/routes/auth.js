"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authServices_1 = require("../services/authServices");
const authDtos_1 = require("../dto/authDtos");
/**
 * This method creates a new user and returns a JWT as a cookie   *
 * @param req - The request object
 * @param res - The response object
 * @returns a JWT as a cookie and the registration DTO including the user, and the token.
 */
const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { user, token, options } = await (0, authServices_1.registerUser)(req.body);
    res.status(201).cookie('jwtToken', token, options).json((0, authDtos_1.createRegisterResponseDto)('User registered successfully', user, token));
});
/**
 * This method logs in a user and returns a JWT as a cookie   *
 * @param req - The request object
 * @param res - The response object
 * @returns a JWT as a cookie and the login DTO including the token.
 */
const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { token, options } = await (0, authServices_1.loginUser)(req.body.email, req.body.password);
    res.status(200).cookie('jwtToken', token, options).json((0, authDtos_1.createLoginResponseDto)('User logged in successfully', token));
});
exports.authRouter = (0, express_1.Router)();
exports.authRouter.route('/register')
    .post(registerUser);
exports.authRouter.route('/login')
    .post(loginUser);
