import userModel from "../models/User";
import type {User} from "../entities/userEntity";
import logger from "../utils/logger";

const serviceName = 'userServices';

export const findUserById = async (id: string) => {
    logger.debug(`${serviceName}: Finding user with id: ${id}`);
    const user = await userModel.findById(id);

    if (!user) {
        logger.error(`${serviceName}: User not found with id of ${id}`);
        throw new Error(`User not found with id of ${id}`);
    }

    logger.debug(`${serviceName}: Returning user ${user}`);
    return user;
}

export const createUser = async (user: User) => {
    logger.debug(`${serviceName}: Creating user ${user}`)
    return await userModel.create(user);
}

export const updateUser = async (id: string, user: User) => {
    logger.debug(`${serviceName}: Updating user with id: ${id} with ${user}`)
    return userModel.findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true
    });
}

export const delUser = async (id: string) => {
    logger.debug(`${serviceName}: Deleting user with id: ${id}`)
    return userModel.findByIdAndDelete(id);
}

// TODO: This is a test function, remove it later
export const findAllUsers = async () => {
    logger.debug(`${serviceName}: Finding all users`)
    return userModel.find();
}