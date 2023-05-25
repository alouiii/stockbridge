import {type Request, type Response, Router} from 'express';
import asyncHandler from "express-async-handler"
import { registerUser as registerUserService, loginUser as loginUserService} from "../services/authServices";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { user, token, options } = await registerUserService(req.body);

    res.status(201).cookie('token', token, options).json(user);
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const {token, options } = await loginUserService(req.body.email, req.body.password);
    res.status(200).cookie('token', token, options).send();
});

export const authRouter = Router();

authRouter.route('/register')
    .post(registerUser);

authRouter.route('/login')
    .post(loginUser);