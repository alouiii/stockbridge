"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.advertRouter = void 0;
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const advertServices_1 = require("../services/advertServices");
const logger_1 = __importDefault(require("../utils/logger"));
/**
 * This method returns an advert by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns a user object.
 */
const getAdvert = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    logger_1.default.info(`Getting advert with id ${id}`);
    const advert = await (0, advertServices_1.findAdvertById)(id);
    if (advert) {
        res.status(200).json(advert);
    }
    else {
        logger_1.default.error(`Could not get advert with id ${id}`);
        res.status(400);
    }
});
/**
 * This method returns all adverts   *
 * @param req - The request object
 * @param res - The response object
 * @returns an array of user objects.
 */
const getAdverts = (0, express_async_handler_1.default)(async (req, res) => {
    const adverts = await (0, advertServices_1.findAllAdverts)();
    res.status(200).json(adverts);
});
/**
 * This method creates a new advert.
 * @param req - The request object
 * @param res - The response object
 * @returns created user object.
 */
const postAdvert = (0, express_async_handler_1.default)(async (req, res) => {
    const advert = await (0, advertServices_1.createAdvert)(req.body);
    logger_1.default.info("Created new advert with id ", advert.id);
    res.status(201).json(advert);
});
/**
 * This method updates an advert by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns updated user object.
 */
const putAdvert = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const advert = await (0, advertServices_1.updateAdvert)(id, req.body);
    res.status(200).json(advert);
});
/**
 * This method deletes an advert by id   *
 * @param req - The request object
 * @param res - The response object
 * @returns deleted user object.
 */
const deleteAdvert = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const advert = await (0, advertServices_1.delAdvert)(id);
    res.status(204).json(advert);
});
exports.advertRouter = (0, express_1.Router)();
exports.advertRouter.route("/").post(postAdvert).get(getAdverts);
exports.advertRouter.route("/:id").get(getAdvert).put(putAdvert).delete(deleteAdvert);
