import mongoose from "mongoose";
import type { Advert, Review, Offer } from "../entities/advertEntity";
import { userSchema } from "./User";

const Types = mongoose.Schema.Types;

export const reviewSchema = new mongoose.Schema<Review>({
  issuer: userSchema,
  date: {
    type: Types.Date,
    required: [true, "The review date is necessary"],
  },
  reviewMessage: {
    type: Types.String,
    required: [true, "The review date is necessary"],
  },
  rating: {
    type: Types.Number,
    required: [true, "Please rate numerically"],
    min: 0,
    max: 5,
  },
});

export const offerSchema = new mongoose.Schema<Offer>({
  status: {
    type: Types.String,
    enum: ["Open", "Accepted", "Rejected", "Canceled"],
    default: "Open",
  },
  issuer: userSchema,
  quantity: {
    type: Types.Number,
    required: true,
    min: 1,
  },
  price: {
    type: Types.Number,
    required: true,
  },
  date: {
    type: Types.Date,
    required: true,
  },
});
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
    type: Types.String,
    enum: ["Ongoing", "Deleted", "Closed"],
    required: true,
  },
  type: {
    type: Types.String,
    enum: ["Ask", "Sell"],
    required: true,
  },
  category: {
    type: Types.String,
    enum: ["Flowers"],
    required: true,
  },
  reviews: { type: [reviewSchema], required: false },
  offers: { type: [offerSchema], required: false },
  store: userSchema,
});

const advertModel = mongoose.model("Advert", advertSchema, "adverts");
export default advertModel;
