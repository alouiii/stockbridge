"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllUsers = exports.delUser = exports.updateUser = exports.createUser = exports.findUserById = void 0;
const User_1 = __importDefault(require("../models/User"));
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler_1 = require("../utils/errorHandler");
const serviceName = "userServices";
/**
 * Find a user by id
 * @param id
 * @returns Promise containing the user
 */
const findUserById = async (id) => {
    logger_1.default.debug(`${serviceName}: Finding user with id: ${id}`);
    const user = await User_1.default.findById(id);
    if (!user) {
        logger_1.default.error(`${serviceName}: User not found with id of ${id}`);
        throw new errorHandler_1.AppError("User not found", "User not found", 404);
    }
    logger_1.default.debug(`${serviceName}: Returning user ${user}`);
    return user;
};
exports.findUserById = findUserById;
/**
 * create a user
 * @param user
 * @returns Promise containing the user
 */
const createUser = async (user) => {
    logger_1.default.debug(`${serviceName}: Creating user ${user}`);
    return await User_1.default.create(user);
};
exports.createUser = createUser;
/**
 * Update a user
 * @param id
 * @param user
 * @returns Promise containing the updated user
 */
const updateUser = async (id, user) => {
    logger_1.default.debug(`${serviceName}: Updating user with id: ${id} with ${user}`);
    return User_1.default.findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true,
    });
};
exports.updateUser = updateUser;
/**
 * Delete a user
 * @param id
 * @returns Promise containing the deleted user
 */
const delUser = async (id) => {
    logger_1.default.debug(`${serviceName}: Deleting user with id: ${id}`);
    return User_1.default.findByIdAndDelete(id);
};
exports.delUser = delUser;
/**
 * Find all users // TODO: This is a test function, remove it later
 * @returns Promise containing all users
 */
const findAllUsers = async () => {
    logger_1.default.debug(`${serviceName}: Finding all users`);
    return User_1.default.find();
};
exports.findAllUsers = findAllUsers;
