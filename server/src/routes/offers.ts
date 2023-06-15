import { Router } from 'express';
import {
  deleteOffer,
  getOffer,
  getOffers,
  getOffersByAdvert,
  getOffersByOfferee,
  getOffersByOfferor,
  postOffer,
  putOffer,
} from '../controllers/offerController';
import { protect } from '../middlewares/authMiddleware';

export const offerRouter = Router();

offerRouter.route('/').post(postOffer).get(protect, getOffers);

offerRouter
  .route('/:id')
  .get(protect, getOffer)
  .put(putOffer)
  .delete(deleteOffer);

offerRouter.route('/getOfferByAdvert/:advert').get(getOffersByAdvert);

offerRouter.route('/getOfferByOfferor/:offeror').get(getOffersByOfferor);

offerRouter.route('/getOfferByOfferee/:offeree').get(getOffersByOfferee);
