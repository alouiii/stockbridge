import { type Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  findOfferById,
  createOffer,
  updateOffer,
  delOffer,
  findAllOffersByAdvert,
  findAllOffersByOfferor,
  findAllOffersByOfferee,
} from '../services/offerServices';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { ObjectId } from 'mongodb';
import { AppError } from '../utils/errorHandler';
import { Offer } from '../entities/offerEntity';
import logger from '../config/logger';

/**
 * This method returns a offer by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns a offer object.
 */
export const getOffer = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const userId = new ObjectId(req.user?.id);

    let offer = await findOfferById(id);
    offer = _findAndCheckRelatedOffers(userId, [offer])[0];

    res.status(200).json(offer);
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
    _checkUserCanEditOrDeleteOffer(req);

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
    _checkUserCanEditOrDeleteOffer(req);

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
    
    let jwtToken;

    if (req.cookies && req.cookies.jwtToken) {
      jwtToken = req.cookies.jwtToken;
    }

    // Make sure token exists
    if (!jwtToken) {
      throw new AppError(
        'Not authorized to access this route',
        'Not authorized to access this route',
        401,
      );
    } else {
      logger.info('Authorized to access the route /adverts');
    }
    const { advert } = req.params;
    let offers = await findAllOffersByAdvert(advert);
    //offers = _findAndCheckRelatedOffers(offers);
    res.status(200).json(offers);
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

    const userId = req.user?.id;
    if (userId != offeror) {
      throw new AppError(
        'Not authorized to access this route',
        'Not authorized to access this route',
        401,
      );
    }

    const offers = await findAllOffersByOfferor(offeror);
    res.status(200).json(offers);
  },
);

/**
 * This method gets all offers received by a user  *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted offer object.
 */
/* export const getOffersByOfferee = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const { offeree } = req.params;
    const userId = req.user?.id;
    if (userId != offeree) {
      throw new AppError(
        'Not authorized to access this route',
        'Not authorized to access this route',
        401,
      );
    }

    const offer = await findAllOffersByOfferee(offeree);
    res.status(200).json(offer);
  },
); */

/**
 * Checks if a user can edit or delete an offer with a given id.
 * @param req The request containing the to be checked ids.
 */
async function _checkUserCanEditOrDeleteOffer(req: AuthenticatedRequest) {
  let userId = new ObjectId(req.user?.id);
  const { id } = req.params;

  // The user editing or deleting must be the offeror.
  if ((await findOfferById(id)).offeror === userId) {
    throw new AppError(
      'Not authorized to edit this route',
      'Not authorized to edit this route',
      401,
    );
  }
}

/**
 * Returns a filtered list of that contains only offers related to the requesting user.
 * @param userId the requesting userId.
 * @param offers the returned offers list before the user check.
 * @returns the filtered list.
 */
function _findAndCheckRelatedOffers(userId: ObjectId, offers: Offer[]): any {
  let relatedOffers = offers.filter(
    (x) => x.offeror === userId || x.offeree === userId,
  );

  // If no offers are retrieved with this request, throw an exception to inform the user.
  if (!relatedOffers?.length) {
    throw new AppError(
      'Not authorized to access this route',
      'Not authorized to access this route',
      401,
    );
  }

  return relatedOffers;
}
