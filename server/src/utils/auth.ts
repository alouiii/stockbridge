import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import asyncHandler from "express-async-handler";
import userModel from "../models/User";
import {AppError} from "./errorHandler";
import environment from "./environment";
import {User} from "../entities/userEntity";

export interface AuthenticatedRequest extends Request {
    user?: User | null; // Replace 'any' with the appropriate type for the user object
}

export const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let jwtToken;

    if (req.cookies && req.cookies.jwtToken) {
      jwtToken = req.cookies.jwtToken;
    }

    // Make sure token exists
    if (!jwtToken) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    }

    try {
        // Verify token
        const decoded: JwtPayload = jwt.verify(jwtToken, environment.JWT_SECRET) as JwtPayload;

        req.user = await userModel.findById(decoded.id);
        next();
    } catch (err) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    }
});