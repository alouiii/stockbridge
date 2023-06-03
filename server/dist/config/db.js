"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = __importDefault(require("../utils/environment"));
const logger_1 = __importDefault(require("../utils/logger"));
const serviceName = 'db';
/**
 * This file is used to configure the database connection.
 */
const connectDB = async () => {
    logger_1.default.debug(`${serviceName}: Connecting to MongoDB at: ${environment_1.default.MONGO_URI}`);
    const conn = await mongoose_1.default.connect(environment_1.default.MONGO_URI);
    logger_1.default.debug(`${serviceName}: MongoDB Connected: ${conn.connection.host}`);
};
exports.connectDB = connectDB;
