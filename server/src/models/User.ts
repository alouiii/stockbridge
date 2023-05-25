import mongoose from "mongoose";
import type {User, Address, PaymentMethod, Subscription} from "../entities/userEntity";

const Types = mongoose.Schema.Types;

const addressSchema = new mongoose.Schema<Address>({
    street: {
        type: Types.String,
        required: [true, 'Please add an address'],
    },
    houseNumber: {
        type: Types.String,
        required: [true, 'Please add a house number'],
    },
    city: {
        type: Types.String,
        required: [true, 'Please add a city'],
    },
    postalCode: {
        type: Types.String,
        required: [true, 'Please add a postal code'],
    },
    country: {
        type: Types.String,
        required: [true, 'Please add a country'],
    },
});

const subscriptionSchema = new mongoose.Schema<Subscription>({
    from: {
        type: Types.Date,
        required: [true, 'Please add a start date'],
    },
    to: {
        type: Types.Date,
        required: [true, 'Please add an end date'],
    },
    renew: {
        type: Types.Boolean,
        required: [true, 'Please add a renew'],
    }
});

const paymentMethodSchema = new mongoose.Schema<PaymentMethod>({
    name: {
        type: Types.String,
        required: [true, 'Please add a name'],
    },
    cardNumber: {
        type: Types.String,
        required: [true, 'Please add a card number'],
    },
    expirationDate: {
        type: Types.Date,
        required: [true, 'Please add an expiration date'],
    },
    cvv: {
        type: Types.String,
        required: [true, 'Please add a cvv'],
    },
});
const userSchema = new mongoose.Schema<User>({
    name: {
        type: Types.String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: Types.String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: Types.String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    prioritisationTickets: {
        type: Types.Number,
        default: 0,
    },
    phoneNumber: {
        type: Types.String,
        maxlength: [20, 'Phone number can not be longer than 20 characters'],
    },
    createdAt: {
        type: Types.Date,
        default: Date.now,
    },
    address: addressSchema,
    subscription: subscriptionSchema,
    paymentMethod: paymentMethodSchema,

});

const userModel = mongoose.model('User', userSchema, 'users');
export default userModel;
