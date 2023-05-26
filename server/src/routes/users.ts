import {type Request, type Response, Router} from 'express';
import asyncHandler from "express-async-handler"
import {findUserById, createUser, updateUser, delUser, findAllUsers} from "../services/userServices";
import { protect, AuthenticatedRequest } from "../utils/auth";
import {AppError} from "../utils/errorHandler";



const getUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const {id} = req.params;

    if (id !== req.user?.id) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    }
    const user = await findUserById(id);
    res.status(200).json(user);
});

const getUsers = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const users = await findAllUsers();
    res.status(200).json(users);
});

const postUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await createUser(req.body);
    res.status(201).json(user);

});

const putUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const {id} = req.params;

    if (id !== req.user?.id) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    }

    const user = await updateUser(id, req.body);
    res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const {id} = req.params;

    if (id !== req.user?.id) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    }

    const user = await delUser(id);
    res.status(204).json(user);
});

const getAuthenticatedUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    res.json(req.user);
});

const getNonAuthenticatedUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    res.json({ message: 'Never gonna give you up' });
});

export const userRouter = Router();

//userRouter.use(protect)

userRouter.route('/getAuthenticatedUser')
    .get(protect, getAuthenticatedUser);

userRouter.route('/getNonAuthenticatedUser')
    .get(getNonAuthenticatedUser);

userRouter.route('/')
    .post(protect, postUser)
    .get(protect, getUsers);

userRouter.route('/:id')
    .get(protect, getUser)
    .put(protect, putUser)
    .delete(protect, deleteUser);



