import { Router } from 'express';
import { protect } from "../middlewares/authMiddleware";
import { getAllAdvertsByCategory,deleteAdvert, postAdvert, putAdvert } from '../controllers/advertController';



export const userRouter = Router();

userRouter.route('/adverts')
    .post(protect, postAdvert)


userRouter.route('/adverts/:id')
    .get(postAdvert)
    .put(protect, putAdvert)
    .delete(protect, deleteAdvert);

userRouter.route('/getAdvertsByCategory/:cat')
    .get(getAllAdvertsByCategory)


export default userRouter;


