"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userServices_1 = require("../services/userServices");
const auth_1 = require("../utils/auth");
const errorHandler_1 = require("../utils/errorHandler");
/**
 * This method verifies if the user is authorized to access the route
 * @param id
 * @param req
 */
const verifyIfAuthorized = (id, req) => {
    if (id !== req.user?.id) {
        throw new errorHandler_1.AppError('Not authorized to access this route', 'Not authorized to access this route', 401);
    }
};
/**
 * This method returns a user by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns a user object.
 */
const getUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    verifyIfAuthorized(id, req);
    const user = await (0, userServices_1.findUserById)(id);
    res.status(200).json(user);
});
/**
 * This method returns all users   *
 * @param req - The request object
 * @param res - The response object
 * @returns an array of user objects.
 */
const getUsers = (0, express_async_handler_1.default)(async (req, res) => {
    const users = await (0, userServices_1.findAllUsers)();
    res.status(200).json(users);
});
/**
 * This method creates a new user. * TODO: This method should be removed later
 * @param req - The request object
 * @param res - The response object
 * @returns created user object.
 */
const postUser = (0, express_async_handler_1.default)(async (req, res) => {
    const user = await (0, userServices_1.createUser)(req.body);
    res.status(201).json(user);
});
/**
 * This method updates a user by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns updated user object.
 */
const putUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    if (id !== req.user?.id) {
        throw new errorHandler_1.AppError('Not authorized to access this route', 'Not authorized to access this route', 401);
    }
    const user = await (0, userServices_1.updateUser)(id, req.body);
    res.status(200).json(user);
});
/**
 * This method deletes a user by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted user object.
 */
const deleteUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    if (id !== req.user?.id) {
        throw new errorHandler_1.AppError('Not authorized to access this route', 'Not authorized to access this route', 401);
    }
    const user = await (0, userServices_1.delUser)(id);
    res.status(204).json(user);
});
// const getAuthenticatedUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
//     res.json(req.user);
// });
//
// const getNonAuthenticatedUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
//     res.json({ message: 'Never gonna give you up' });
// });
exports.userRouter = (0, express_1.Router)();
//userRouter.use(protect)
// userRouter.route('/getAuthenticatedUser')
//     .get(protect, getAuthenticatedUser);
//
// userRouter.route('/getNonAuthenticatedUser')
//     .get(getNonAuthenticatedUser);
exports.userRouter.route('/')
    .post(auth_1.protect, postUser) //TODO: This route should be removed later
    .get(auth_1.protect, getUsers);
exports.userRouter.route('/:id')
    .get(auth_1.protect, getUser)
    .put(auth_1.protect, putUser)
    .delete(auth_1.protect, deleteUser);
