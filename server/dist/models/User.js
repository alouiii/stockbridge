"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const environment_1 = __importDefault(require("../utils/environment"));
const Types = mongoose_1.default.Schema.Types;
const addressSchema = new mongoose_1.default.Schema({
    street: {
        type: Types.String,
        required: [true, "Please add an address"],
    },
    houseNumber: {
        type: Types.String,
        required: [true, "Please add a house number"],
    },
    city: {
        type: Types.String,
        required: [true, "Please add a city"],
    },
    postalCode: {
        type: Types.String,
        required: [true, "Please add a postal code"],
    },
    country: {
        type: Types.String,
        required: [true, "Please add a country"],
    },
});
const subscriptionSchema = new mongoose_1.default.Schema({
    from: {
        type: Types.Date,
        required: [true, "Please add a start date"],
    },
    to: {
        type: Types.Date,
        required: [true, "Please add an end date"],
    },
    renew: {
        type: Types.Boolean,
        required: [true, "Please add a renew"],
    },
});
const paymentMethodSchema = new mongoose_1.default.Schema({
    name: {
        type: Types.String,
        required: [true, "Please add a name"],
    },
    cardNumber: {
        type: Types.String,
        required: [true, "Please add a card number"],
    },
    expirationDate: {
        type: Types.Date,
        required: [true, "Please add an expiration date"],
    },
    cvv: {
        type: Types.String,
        required: [true, "Please add a cvv"],
    },
});
exports.userSchema = new mongoose_1.default.Schema({
    name: {
        type: Types.String,
        required: [true, "Please add a name"],
    },
    email: {
        type: Types.String,
        required: [true, "Please add an email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
    },
    password: {
        type: Types.String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false,
    },
    prioritisationTickets: {
        type: Types.Number,
        default: 0,
    },
    phoneNumber: {
        type: Types.String,
        maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    createdAt: {
        type: Types.Date,
        default: Date.now,
    },
    address: addressSchema,
    subscription: subscriptionSchema,
    paymentMethod: paymentMethodSchema,
});
/**
 * If password is modified, encrypt it using bcrypt. This runs before every save operation.
 * @returns {Promise<void>}
 */
exports.userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
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
exports.userSchema.methods.getSignedJwtToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, environment_1.default.JWT_SECRET, {
        expiresIn: environment_1.default.JWT_EXPIRE,
    });
};
/**
 * Match user entered password to hashed password in database.
 * @param enteredPassword
 * @returns {Promise<boolean>}
 */
exports.userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
const userModel = mongoose_1.default.model("User", exports.userSchema, "users");
exports.default = userModel;
