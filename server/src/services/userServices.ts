import userModel from "../models/User";
import type {User} from "../entities/userEntity";

export const findUserById = async (id: string) => {
    const user = await userModel.findById(id);

    if (!user) {
        throw new Error(`User not found with id of ${id}`);
    }
    return user;
}

export const createUser = async (user: User) => {
    return await userModel.create(user);
}

export const updateUser = async (id: string, user: User) => {
    return userModel.findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true
    });
}

export const delUser = async (id: string) => {
    return userModel.findByIdAndDelete(id);
}

// TODO: This is a test function, remove it later
export const findAllUsers = async () => {
    return userModel.find();
}