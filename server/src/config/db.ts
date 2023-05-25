import mongoose from 'mongoose';
import environment from "../utils/environment";
import logger from "../utils/logger";

export const connectDB = async () => {
    logger.debug(`Connecting to MongoDB at: ${environment.MONGO_URI}`)

    const conn = await mongoose.connect(environment.MONGO_URI || '');

    logger.debug(`MongoDB Connected: ${conn.connection.host}`)
};