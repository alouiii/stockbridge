import mongoose from "mongoose";
import { ADVERT_STATUS, ADVERT_TYPE, Advert, PRODUCT_CATEGORY } from "../entities/advertEntity";

const Types = mongoose.Schema.Types;

export const advertSchema = new mongoose.Schema<Advert>({
  productname: {
    type: Types.String,
    required: [true, "Please add a product name"],
  },
  description: {
    type: Types.String,
    required: [false, "You could add a product descripton"],
  },
  imageurl: {
    type: Types.String,
    required: [false, "You could add a product picture"],
  },
  price: {
    type: Types.Number,
    required: [true, "Please add the product's unit price"],
  },
  quantity: {
    type: Types.Number,
    required: [true, "Please add the product's quantity"],
  },
  color: {
    type: Types.String,
    required: [false, "Please add the product's color"],
  },
  expirationDate: {
    type: Types.Date,
    required: [false, "Please add the product's purchase or expiration date"],
  },
  date: {
    type: Types.Date,
    required: true,
  },
  prioritized: {
    type: Types.Boolean,
    required: [true, "Please specify whether the advert is prioritized"],
    default: false,
  },
  status: {
    default: ADVERT_STATUS.ONGOING,
    enum: Object.values(ADVERT_STATUS),
    required: [true, "Please add a status"] 
  },
  type: {
    enum: Object.values(ADVERT_TYPE),
    required: [true, "Please add an advert type"] 
  },
  category: {
    enum: Object.values(PRODUCT_CATEGORY),
    required: [true, "Please add a product category"] 
  },
  reviews: [{
    type: Types.ObjectId,
    ref: 'Review',
    required: true,
  }],
  offers: [{ 
    type: Types.ObjectId,
    ref: 'Review',
    required: true,
  }],
  store: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const advertModel = mongoose.model("Advert", advertSchema, "adverts");
export default advertModel;