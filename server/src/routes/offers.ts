import { Router } from 'express';
import {
  deleteOffer,
  getOffer,
  getOffersByAdvert,
  getOffersByOfferee,
  getOffersByOfferor,
  postOffer,
  putOffer,
} from '../controllers/offerController';
import { protect } from '../middlewares/authMiddleware';

export const offerRouter = Router();

offerRouter.route('/').post(protect, postOffer);

offerRouter
  .route('/:id')
  .get(protect, getOffer)
  .put(protect, putOffer)
  .delete(protect, deleteOffer);

offerRouter.route('/getOffersByAdvert/:advert').get(getOffersByAdvert);

offerRouter
  .route('/getOfferByOfferor/:offeror')
  .get(protect, getOffersByOfferor);

offerRouter
  .route('/getOfferByOfferee/:offeree')
  .get(protect, getOffersByOfferee);
