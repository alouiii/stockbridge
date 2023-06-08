import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import {
  registerUser as registerUserService,
  loginUser as loginUserService,
} from "../services/authServices";
import { createLoginResponseDto, createAuthResponseDto } from "../dto/authDto";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

/**
 * This method creates a new user and returns a JWT as a cookie   *
 * @param req - The request object
 * @param res - The response object
 * @returns a JWT as a cookie and the registration DTO including the user, and the token.
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { user, token, options } = await registerUserService(req.body);
  res
    .status(201)
    .cookie("jwtToken", token, options)
    .json(createAuthResponseDto("User registered successfully", user, token));
});

/**
 * This method logs in a user and returns a JWT as a cookie   *
 * @param req - The request object
 * @param res - The response object
 * @returns a JWT as a cookie and the login DTO including the token.
 */
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { user, token, options } = await loginUserService(
    req.body.email,
    req.body.password
  );
  res
    .status(200)
    .cookie("jwtToken", token, options)
    .json(createAuthResponseDto("User logged in successfully", user, token));
});

/**
 * Route POST api/auth/logout
 * Logs out a user
 * @param req - The request object
 * @param res - The response object
 * @returns a JWT as a cookie and the logout DTO including the token.
 */
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwtToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out successfully" });
});

export const verifyUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    res.status(200).json(req.user);
  }
);

export { registerUser, loginUser, logoutUser };
