"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const environment_1 = __importDefault(require("./environment"));
/**
 * This file is used to configure the logger.
 */
const logger = winston_1.default.createLogger({
    level: environment_1.default.LOG_LEVEL,
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize({ all: true }), winston_1.default.format.simple()),
        }),
    ],
});
exports.default = logger;
