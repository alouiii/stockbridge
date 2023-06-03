"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertSchema = exports.offerSchema = exports.reviewSchema = exports.ProductCategory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./User");
const Types = mongoose_1.default.Schema.Types;
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["FLOWERS"] = "Flowers";
    ProductCategory["BOOKS"] = "Books";
    ProductCategory["FOOD"] = "Food and Beverages";
})(ProductCategory = exports.ProductCategory || (exports.ProductCategory = {}));
exports.reviewSchema = new mongoose_1.default.Schema({
    issuer: User_1.userSchema,
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
exports.offerSchema = new mongoose_1.default.Schema({
    status: {
        type: Types.String,
        enum: ["Open", "Accepted", "Rejected", "Canceled"],
        default: "Open",
    },
    issuer: User_1.userSchema,
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
exports.advertSchema = new mongoose_1.default.Schema({
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
        enum: ProductCategory,
        required: true,
    },
    reviews: { type: [exports.reviewSchema], required: false },
    offers: { type: [exports.offerSchema], required: false },
    store: User_1.userSchema,
});
const advertModel = mongoose_1.default.model("Advert", exports.advertSchema, "adverts");
exports.default = advertModel;
