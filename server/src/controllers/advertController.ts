import { type Response, Router } from 'express';
import asyncHandler from "express-async-handler"
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import {AppError} from "../utils/errorHandler";
import { createAdvert, delAdvert, findAdvertById, updateAdvert, getAllAdverts, getAdvertsByCategory } from '../services/advertServices';
import { ADVERT_TYPE, PRODUCT_CATEGORY } from '../entities/advertEntity';


/**
 * This method verifies if the user is authorized to access the route
 * @param id
 * @param req
 */
export const verifyIfAuthorized = (id: string, req: AuthenticatedRequest) => {
    if (id !== req.user?.id) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route', 401)
    }
}

/**
 * This method returns an advert by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns an advert object.
 */
export const getAdvert = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const {id} = req.params;
    verifyIfAuthorized(id, req);
    const advert = await findAdvertById(id);
    res.status(200).json(advert);
});

/**
 * This method returns all adverts   *
 * @param req - The request object
 * @param res - The response object
 * @returns an array of advert objects.
 */
export const getAdverts = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const adverts = await getAllAdverts();
    res.status(200).json(adverts);
});


export const getAllAdvertsByCategory = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const {category} = req.params;
    const adverts = await getAdvertsByCategory(category as unknown as PRODUCT_CATEGORY);
    res.status(200).json(adverts);
})

/**
 * This method creates a new advert.
 * @param req - The request object
 * @param res - The response object
 * @returns created advert object.
 */
export const postAdvert = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const advert = await createAdvert(req.body);
    res.status(201).json(advert);
});

/**
 * This method updates an advert by id 
 * @param req - The request object
 * @param res - The response object
 * @returns updated advert object.
 */
export const putAdvert = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const {id} = req.params;

    // TODO: check that user is logged in.

    const user = await updateAdvert(id, req.body);
    res.status(200).json(user);
});

/**
 * This method deletes an advert by id.
 * @param req - The request object
 * @param res - The response object
 * @returns deleted advert object.
 */
export const deleteAdvert = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const {id} = req.params;

    if (id !== req.user?.id) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    }

    const user = await delAdvert(id);
    res.status(204).json(user);
});


