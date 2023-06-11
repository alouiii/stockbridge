import { type Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  findOfferById,
  createOffer,
  updateOffer,
  delOffer,
  findAllOffers,
  findAllOffersByAdvert,
  findAllOffersByOfferor,
  findAllOffersByOfferee,
} from '../services/offerServices';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { Advert } from '../entities/advertEntity';
import { User } from '../entities/userEntity';

/**
 * This method returns a offer by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns a offer object.
 */
export const getOffer = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    //verifyIfAuthorized(id, req);
    const offer = await findOfferById(id);
    res.status(200).json(offer);
  },
);

/**
 * This method returns all offers   *
 * @param req - The request object
 * @param res - The response object
 * @returns an array of offer objects.
 */
export const getOffers = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const offers = await findAllOffers();
    res.status(200).json(offers);
  },
);

/**
 * This method creates a new offer. * TODO: This method should be removed later
 * @param req - The request object
 * @param res - The response object
 * @returns created offer object.
 */
export const postOffer = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const offer = await createOffer(req.body);
    res.status(201).json(offer);
  },
);

/**
 * This method updates a offer by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns updated offer object.
 */
export const putOffer = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    /* if (id !== req.user?.id) {
        throw new AppError('Not authorized to access this route', 'Not authorized to access this route',401)
    } */

    const offer = await updateOffer(id, req.body);
    res.status(200).json(offer);
  },
);

/**
 * This method deletes a offer by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted offer object.
 */
export const deleteOffer = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    const offer = await delOffer(id);
    res.status(204).json(offer);
  },
);

/**
 * This method gets all offers of an advert   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted offer object.
 */
export const getOffersByAdvert = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { advert } = req.params;

    const offer = await findAllOffersByAdvert(advert as unknown as Advert);
    res.status(204).json(offer);
  },
);

/**
 * This method gets all offers proposed by a user  *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted offer object.
 */
export const getOffersByOfferor = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { offeror } = req.params;

    const offer = await findAllOffersByOfferor(offeror as unknown as User);
    res.status(204).json(offer);
  },
);

/**
 * This method gets all offers received by a user  *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted offer object.
 */
export const getOffersByOfferee = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { offeree } = req.params;

    const offer = await findAllOffersByOfferee(offeree as unknown as User);
    res.status(204).json(offer);
  },
);
