"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllAdverts = exports.delAdvert = exports.updateAdvert = exports.createAdvert = exports.findAdvertById = void 0;
const Advert_1 = __importDefault(require("../models/Advert"));
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler_1 = require("../utils/errorHandler");
const serviceName = "advertServices";
/**
 * Find an advert by id
 * @param id
 * @returns Promise containing the advert
 */
const findAdvertById = async (id) => {
    logger_1.default.debug(`${serviceName}: Finding advert with id: ${id}`);
    const advert = await Advert_1.default.findById(id);
    if (!advert) {
        logger_1.default.error(`${serviceName}: advert not found with id of ${id}`);
        throw new errorHandler_1.AppError("advert not found", "advert not found", 404);
    }
    logger_1.default.debug(`${serviceName}: Returning advert ${advert}`);
    return advert;
};
exports.findAdvertById = findAdvertById;
/**
 * create a advert
 * @param advert
 * @returns Promise containing the advert
 */
const createAdvert = async (advert) => {
    logger_1.default.debug(`${serviceName}: Creating advert ${advert}`);
    return await Advert_1.default.create(advert);
};
exports.createAdvert = createAdvert;
/**
 * Update a advert
 * @param id
 * @param advert
 * @returns Promise containing the updated advert
 */
const updateAdvert = async (id, advert) => {
    logger_1.default.debug(`${serviceName}: Updating advert with id: ${id} with ${advert}`);
    return Advert_1.default.findByIdAndUpdate(id, advert, {
        new: true,
        runValidators: true,
    });
};
exports.updateAdvert = updateAdvert;
/**
 * Delete a advert
 * @param id
 * @returns Promise containing the deleted advert
 */
const delAdvert = async (id) => {
    logger_1.default.debug(`${serviceName}: Deleting advert with id: ${id}`);
    return Advert_1.default.findByIdAndDelete(id);
};
exports.delAdvert = delAdvert;
/**
 * Find all adverts
 * @returns Promise containing all adverts
 */
const findAllAdverts = async () => {
    logger_1.default.debug(`${serviceName}: Finding all adverts`);
    return Advert_1.default.find();
};
exports.findAllAdverts = findAllAdverts;
