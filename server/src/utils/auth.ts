import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import asyncHandler from "express-async-handler";
import userModel from "../models/User";
import {AppError} from "./errorHandler";
import environment from "./environment";
import {User} from "../entities/userEntity";

interface AuthenticatedRequest extends Request {
    user?: User | null; // Replace 'any' with the appropriate type for the user object
}

export const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token;

    // if (
    //     req.headers.authorization &&
    //     req.headers.authorization.startsWith('Bearer')
    // ) {
    //     // Set token from Bearer token in header
    //     token = req.headers.authorization.split(' ')[1];
    //     // Set token from cookie
    // } else
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    }

    try {
        // Verify token
        const decoded: JwtPayload = jwt.verify(token, environment.JWT_SECRET) as JwtPayload;

        req.user = await userModel.findById(decoded.id);

        next();
    } catch (err) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    }
});