import userModel from "../models/User";
import type {User} from "../entities/userEntity";
import logger from "../utils/logger";
import environment from "../utils/environment";


const serviceName = 'authServices';

export const registerUser = async (user: User) => {
    logger.debug(`${serviceName}: Creating user ${user}`)
    const createdUser = await userModel.create(user);
    return sendTokenResponse(createdUser);
}

export const loginUser = async (email: string, password: string) => {
    // Check for user
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return sendTokenResponse(user);
}

const sendTokenResponse = (user: any) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            // Expire in 30 days (in milliseconds)
            Date.now() + environment.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
        secure: false
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    return { user, token, options };
};