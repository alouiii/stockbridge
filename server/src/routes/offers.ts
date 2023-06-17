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

offerRouter.route('/getOffersByAdvert/:advert').get(getOffersByAdvert);

offerRouter.route('/getOffersByOfferor/:offeror').get(getOffersByOfferor);

offerRouter.route('/getOffersByOfferee/:offeree').get(getOffersByOfferee);
