"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./preStart"); // always have this at the top of this file in order to execute these scripts first
const express_1 = __importDefault(require("express"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
// TODO: Add types to import below
// import xss from 'xss-clean';
const db_1 = require("./config/db");
const environment_1 = __importDefault(require("./utils/environment"));
const logger_1 = __importDefault(require("./utils/logger"));
const errorHandler_1 = require("./utils/errorHandler");
//Routes
const users_1 = require("./routes/users");
const auth_1 = require("./routes/auth");
const adverts_1 = require("./routes/adverts");
(0, db_1.connectDB)();
const app = (0, express_1.default)();
// Body parser
app.use(express_1.default.json());
// Cookie parser
app.use((0, cookie_parser_1.default)());
// Dev logging middleware
if (environment_1.default.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Sanitize data
app.use((0, express_mongo_sanitize_1.default)());
// Set security headers
app.use((0, helmet_1.default)());
// Prevent http param pollution
app.use((0, hpp_1.default)());
// Enable CORS
app.use((0, cors_1.default)());
// Mount routers
app.use("/api/v1/users", users_1.userRouter);
app.use("/api/v1/auth", auth_1.authRouter);
app.use("/api/v1/adverts", adverts_1.advertRouter);
app.use(errorHandler_1.errorHandler);
const PORT = environment_1.default.PORT || 3001;
// app.listen(PORT, () => {
//     logger.info(`Server running in ${environment.NODE_ENV} mode on port ${PORT}`
//     );
// });
const onListening = (server) => () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port ?? ""}`;
    logger_1.default.info(`Server running in ${environment_1.default.NODE_ENV} listening on ${bind}`);
};
// create a server based on our Express application
const server = http_1.default.createServer(app);
// add an error handler for anything uncaught by the app
(0, errorHandler_1.listenToErrorEvents)(server);
server.on("listening", onListening(server));
server.listen(PORT);
