import {type Request, type Response, Router} from 'express';
import asyncHandler from "express-async-handler"
import {findUserById, createUser, updateUser, delUser, findAllUsers} from "../services/userServices";
import { protect } from "../utils/auth";



const getUser = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await findUserById(id);
    res.status(200).json(user);
});

const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await findAllUsers();
    res.status(200).json(users);
});

const postUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await createUser(req.body);
    res.status(201).json(user);

});

const putUser = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await updateUser(id, req.body);
    res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await delUser(id);
    res.status(204).json(user);
});

export const userRouter = Router();

userRouter.use(protect)

userRouter.route('/')
    .post(postUser)
    .get(getUsers);

userRouter.route('/:id')
    .get(getUser)
    .put(putUser)
    .delete(deleteUser);


