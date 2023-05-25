import './preStart'; // always have this at the top of this file in order to execute these scripts first
import express, { Express } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import morgan from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';
// TODO: Add types to import below
// import xss from 'xss-clean';

import { connectDB } from './config/db';
import environment from "./utils/environment";
import logger from "./utils/logger";

//Routes
import { userRouter } from './routes/users';


connectDB();


const app: Express = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (environment.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());


// Mount routers
app.use('/api/v1/users', userRouter);

const PORT = environment.PORT || 3001;

app.listen(PORT, () => {
    logger.info(`Server running in ${environment.NODE_ENV} mode on port ${PORT}`
    );
});

//TODO: Server crashes when trying to connect to MongoDB Atlas
//TODO: Server crashes when validation fails

