import { type Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  findAdvertById,
  createAdvert,
  updateAdvert,
  delAdvert,
  findAllAdverts,
  getAdvertsByCategory,
} from '../services/advertServices';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { AppError } from '../utils/errorHandler';
import { Advert, ProductCategory } from '../entities/advertEntity';
import { ObjectId } from 'mongodb';

/**
 * This method returns an advert by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns an advert object.
 */
export const getAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
   
    //verifyIfAuthorized(id, req);
    const advert = await findAdvertById(id);
    res.status(200).json(advert);
  },
);

/**
 * This method returns all adverts   *
 * @param req - The request object
 * @param res - The response object
 * @returns an array of advert objects.
 */
export const getAdverts = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const adverts = await findAllAdverts();
    res.status(200).json(adverts);
  },
);

/**
 * This method creates a new advert. * TODO: This method should be removed later
 * @param req - The request object
 * @param res - The response object
 * @returns created advert object.
 */
export const postAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const advert = await createAdvert(req.body);
    res.status(201).json(advert);
  },
);

/**
 * This method updates an advert by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns updated advert object.
 */
export const putAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const newAdvert = req.body;
    const existingAdvert = await findAdvertById(id);
    
    //TODO: These should be handled differently -- create the entity and the id is added here from there.
    // if (newAdvert.reviews) {
    //   newAdvert.reviews = (existingAdvert.reviews || []).concat(
    //     newAdvert.reviews,
    //   );
    // }

    // if (newAdvert.offers) {
    //   newAdvert.offers = (existingAdvert.offers || []).concat(newAdvert.offers);
    // }
    _checkUserCanEditOrDeleteAdvert(req);
    const advert = await updateAdvert(id, newAdvert);
    res.status(200).json(advert);
  },
);

/**
 * This method deletes an advert by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted advert object.
 */
export const deleteAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    const advert = await delAdvert(id);
    res.status(204).json(advert);
  },
);

/**
 * This method gets all adverts of a specific category   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted advert object.
 */
export const getAllAdvertsByCategory = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { category } = req.params;
    const adverts = await getAdvertsByCategory(category as ProductCategory);
    res.status(200).json(adverts);
  },
);


/**
 * Checks if a user can edit or delete an advert with a given id.
 * @param req The request containing the to be checked ids.
 */
async function _checkUserCanEditOrDeleteAdvert(req: AuthenticatedRequest) {
  let userId = new ObjectId(req.user?.id);
  const { id } = req.params;

  // The user editing or deleting must be the one who created the advert.
  if (!(await findAdvertById(id, false)).store.equals(userId)) {
    throw new AppError(
      'Not authorized to edit this route',
      'Not authorized to edit this route',
      401,
    );
  }
}