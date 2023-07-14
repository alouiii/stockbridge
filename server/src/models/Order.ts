import mongoose from 'mongoose';
import logger from '../config/logger';
import { AdvertStatus } from '../entities/advertEntity';
import { OrderStatus, Order } from '../entities/orderEntity';
import { findAdvertById } from '../services/advertServices';
import offerModel from './Offer';
import { createStripePaymentIntent } from '../services/stripeService';
import userModel from './User';
import advertModel from './Advert';
import { User } from '../entities/userEntity';

const Types = mongoose.Schema.Types;

export const orderSchema = new mongoose.Schema<Order>({
  totalPrice: {
    type: Types.Number,
    required: [true, 'Please add a total price'],
  },
  quantity: {
    type: Types.Number,
    required: [true, 'Please add a quantity'],
  },
  status: {
    enum: Object.values(OrderStatus),
    required: [false, 'Please add an order status'],
  },
  offer: {
    type: Types.ObjectId,
    ref: 'Offer',
    required: true,
  },
  createdAt: {
    type: Types.Date,
    required: [true, 'Please add a creation date'],
  },
  paymentId: {
    type: Types.String,
  },
});
orderSchema.pre<Order>('save', async function (next) {
  try {
    const offer = await offerModel.findById(this.offer);
    if (offer) {
      const advert = await findAdvertById(offer?.advert.toString());
      if (advert?.quantity) {
        advert.quantity = advert?.quantity - this.quantity;
        if (advert.quantity <= 0) {
          advert.status = AdvertStatus.Closed;
        }
        advert.save();
      }
      next();
    }
  } catch (error) {
    logger.error(`Failed updating advert corresponding to order ${this.id}`);
  }
  next();
});

orderSchema.pre<Order>('save', async function (next) {
  const offer = await offerModel.findById(this.offer);
  const advert = await advertModel.findById(offer?.advert.toString()!);
  const offeror = await userModel.findById(offer?.offeror.toString()!);
  const offeree = await userModel.findById(offer?.offeree.toString()!);
  let payer: User;
  if (advert && advert.type === 'Sell') {
    payer = offeror as User;
  } else {
    payer = offeree as User;
  }
  const paymentIntent = await createStripePaymentIntent(
    payer as User,
    this.totalPrice,
    advert!._id.toString(),
    {
      off_session: true,
      confirm: true,
    },
  );
  this.paymentId = paymentIntent.id;
});
export const orderModel = mongoose.model('Order', orderSchema, 'orders');
export default orderModel;
