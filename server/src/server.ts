import './preStart'; // always have this at the top of this file in order to execute these scripts first
import express, { Express } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';
import http from "http";
// TODO: Add types to import below
// import xss from 'xss-clean';
import { connectDB } from './config/db';
import environment from "./utils/environment";
import logger from "./utils/logger";
import {errorHandler, listenToErrorEvents} from "./utils/errorHandler";

//Routes
import { userRouter } from './routes/users';
import {authRouter} from "./routes/auth";


connectDB();


const app: Express = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

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
app.use('/api/v1/auth', authRouter);


app.use(errorHandler)

const PORT = environment.PORT || 3001;

// app.listen(PORT, () => {
//     logger.info(`Server running in ${environment.NODE_ENV} mode on port ${PORT}`
//     );
// });


const onListening = (server: http.Server) => (): void => {
    const addr = server.address();
    const bind =
        typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port ?? ""}`;
    logger.info(`Server running in ${environment.NODE_ENV} listening on ${bind}`);
};

// create a server based on our Express application
const server = http.createServer(app);
// add an error handler for anything uncaught by the app
listenToErrorEvents(server);
server.on("listening", onListening(server));
server.listen(PORT);

