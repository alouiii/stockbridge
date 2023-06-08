import mongoose from "mongoose";
import type {User, Address, PaymentMethod, Subscription} from "../entities/userEntity";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import environment from "../utils/environment";

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
    },
    phoneNumber: {
        type: Types.String,
        maxlength: [20, 'Phone number can not be longer than 20 characters'],
    },
    createdAt: {
        type: Types.Date,
    },
    rating: {
        type: Types.Number,
        min: 0,
        max: 5
    },
    address: addressSchema,
    subscription: subscriptionSchema,
    paymentMethod: paymentMethodSchema,

});

/**
 * If password is modified, encrypt it using bcrypt. This runs before every save operation.
 * @returns {Promise<void>}
 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Encrypt password using bcrypt while updating (admin)
// userSchema.pre("findOneAndUpdate", async function ( next) {
//     if (this._update.password) {
//         this._update.password = await bcrypt.hash(this._update.password, 10);
//     }
//     next();
// });

/**
 * Sign JWT and return it with the user id as payload.
 * @returns {string}
 */
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, environment.JWT_SECRET, {
        expiresIn: environment.JWT_EXPIRE,
    });
};

/**
 * Match user entered password to hashed password in database.
 * @param enteredPassword
 * @returns {Promise<boolean>}
 */
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const userModel = mongoose.model('User', userSchema, 'users');
export default userModel;
