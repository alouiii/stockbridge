import { Router } from 'express';
import {
  deleteAdvert,
  getAdvert,
  getAdverts,
  getAllAdvertsByCategory,
  postAdvert,
  putAdvert,
} from '../controllers/advertController';
import { protect } from '../middlewares/authMiddleware';

export const advertRouter = Router();

advertRouter.route('/').post(protect, postAdvert).get(getAdverts);

advertRouter
  .route('/:id')
  .get(protect, getAdvert)
  .put(protect, putAdvert)
  .delete(protect, deleteAdvert);

advertRouter
  .route('/getAdvertsByCategory/:cat')
  .get(getAllAdvertsByCategory);
