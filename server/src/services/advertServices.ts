import logger from "../config/logger";
import { ADVERT_TYPE, Advert, PRODUCT_CATEGORY } from "../entities/advertEntity";
import advertModel from "../models/Advert";
import userModel from "../models/User";
import { AppError } from "../utils/errorHandler";

const serviceName = 'advertServices';


export const getAllAdverts = async () => {
    logger.debug(`${serviceName}: Getting all the adverts`);
    return advertModel.find();
}

/**
 * Find an advert by id
 * @param id
 * @returns Promise containing the user
 */
export const findAdvertById = async (id: string) => {
    logger.debug(`${serviceName}: Finding advert with id: ${id}`);
    const advert = await advertModel.findById(id);

    if (!advert) {
        logger.error(`${serviceName}: Advert not found with id of ${id}`);
        throw new AppError('Advert not found', 'Advert not found', 404);
    }

    logger.debug(`${serviceName}: Returning advert ${advert}`);
    return advert;
}

/**
 * create an Advert
 * @param advert
 * @returns Promise containing the user
 */
export const createAdvert = async (advert: Advert) => {
    logger.debug(`${serviceName}: Creating advert ${advert}`)
    return await advertModel.create(advert);
}

/**
 * Update an advert
 * @param id
 * @param advert
 * @returns Promise containing the updated advert
 */
export const updateAdvert = async (id: string, advert: Advert) => {
    logger.debug(`${serviceName}: Updating advert with id: ${id} with ${advert}`)
    return advertModel.findByIdAndUpdate(id, advert, {
        new: true,
        runValidators: true
    });
}

/**
 * Delete an advert
 * @param id
 * @returns Promise containing the deleted advert.
 */
export const delAdvert = async (id: string) => {
    logger.debug(`${serviceName}: Deleting advert with id: ${id}`)
    return advertModel.findByIdAndDelete(id);
}

/**
 * Returns all adverts of the requested category
 * @param category
 * @returns Promise containing the deleted advert.
 */
export const getAdvertsByCategory = async (category: PRODUCT_CATEGORY) => {
    logger.debug(`${serviceName}: Requesting all adverts with category: ${category}`)
    return advertModel.find({'category': category});
}


/**
 * Find all users // TODO: This is a test function, remove it later
 * @returns Promise containing all users
 */
export const findAllUsers = async () => {
    logger.debug(`${serviceName}: Finding all users`)
    return userModel.find();
}