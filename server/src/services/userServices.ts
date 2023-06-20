import userModel from '../models/User';
import type { User } from '../entities/userEntity';
import logger from '../config/logger';
import { AppError } from '../utils/errorHandler';

const serviceName = 'userServices';

/**
 * Find a user by id
 * @param id
 * @returns Promise containing the user
 */
export const findUserById = async (id: string) => {
  logger.debug(`${serviceName}: Finding user with id: ${id}`);
  const user = await userModel.findById(id);

  if (!user) {
    logger.error(`${serviceName}: User not found with id of ${id}`);
    throw new AppError('User not found', 'User not found', 404);
  }

  logger.debug(`${serviceName}: Returning user ${user}`);
  return user;
};

/**
 * create a user
 * @param user
 * @returns Promise containing the user
 */
export const createUser = async (user: User) => {
  logger.debug(`${serviceName}: Creating user ${user}`);
  return await userModel.create(user);
};

/**
 * Update a user
 * @param id
 * @param user
 * @returns Promise containing the updated user
 */
export const updateUser = async (id: string, user: User) => {
  logger.debug(`${serviceName}: Updating user with id: ${id} with ${user}`);

  if (user.hasOwnProperty('prioritisationTickets')) {
    throw new AppError(
      'Cannot update prioritisation tickets',
      'Cannot update prioritisation tickets',
      403,
    );
  }

  return userModel.findByIdAndUpdate(id, user, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete a user
 * @param id
 * @returns Promise containing the deleted user
 */
export const delUser = async (id: string) => {
  logger.debug(`${serviceName}: Deleting user with id: ${id}`);
  return userModel.findByIdAndDelete(id);
};

/**
 * Find all users // TODO: This is a test function, remove it later
 * @returns Promise containing all users
 */
export const findAllUsers = async () => {
  logger.debug(`${serviceName}: Finding all users`);
  return userModel.find();
};

export const handleSuccessfulPaymentIntent = async (
  userId: string,
  product: string,
) => {
  logger.debug(
    `${serviceName}: Handling successful payment intent for ${userId}`,
  );
  const user = (await userModel.findById(userId)) as User;
  switch (product) {
    case 'Basic Pack':
      user.prioritisationTickets += 5;
      break;
    case 'Advanced Pack':
      user.prioritisationTickets += 10;
      break;
    case 'Premium Pack':
      user.prioritisationTickets += 20;
      break;
    case 'Basic Subscription':
    case 'Advanced Subscription':
    case 'Premium Subscription':
      user.subscription = {
        renew: true,
        from: new Date(),
        to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };
      break;
    default:
      throw new AppError('Product not found', 'Product not found', 404);
  }
  await userModel.findByIdAndUpdate(user.id, user);
};
