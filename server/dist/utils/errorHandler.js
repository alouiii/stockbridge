"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.listenToErrorEvents = exports.AppError = void 0;
const logger_1 = __importDefault(require("./logger"));
const util = __importStar(require("util"));
// This whole handling logic is copied from https://github.com/practicajs/practica was and modified to fit our application
let httpServerRef;
class AppError extends Error {
    name;
    message;
    HTTPStatus;
    isTrusted;
    cause;
    constructor(name, message, HTTPStatus = 500, isTrusted = true, cause) {
        super(message);
        this.name = name;
        this.message = message;
        this.HTTPStatus = HTTPStatus;
        this.isTrusted = isTrusted;
        this.cause = cause;
    }
}
exports.AppError = AppError;
// Listen to the global process-level error events
const listenToErrorEvents = (httpServer) => {
    httpServerRef = httpServer;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.on("uncaughtException", (error) => {
        handleError(error);
    });
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.on("unhandledRejection", (reason) => {
        handleError(reason);
    });
    process.on("SIGTERM", () => {
        logger_1.default.error("App received SIGTERM event, try to gracefully close the server");
        terminateHttpServerAndExit();
    });
    process.on("SIGINT", () => {
        logger_1.default.error("App received SIGINT event, try to gracefully close the server");
        terminateHttpServerAndExit();
    });
};
exports.listenToErrorEvents = listenToErrorEvents;
const handleError = (errorToHandle) => {
    try {
        const appError = normalizeError(errorToHandle);
        logger_1.default.error(appError.message, appError);
        // A common best practice is to crash when an unknown error (non-trusted) is being thrown
        if (!appError.isTrusted) {
            terminateHttpServerAndExit();
        }
    }
    catch (handlingError) {
        // Not using the logger here because it might have failed
        process.stdout.write("The error handler failed, here are the handler failure and then the origin error that it tried to handle");
        process.stdout.write(JSON.stringify(handlingError));
        process.stdout.write(JSON.stringify(errorToHandle));
    }
};
const terminateHttpServerAndExit = () => {
    // maybe implement more complex logic here (like using 'http-terminator' library)
    httpServerRef?.close();
    process.exit();
};
// The input might won't be 'AppError' or even 'Error' instance, the output of this function will be - AppError.
const normalizeError = (errorToHandle) => {
    if (errorToHandle instanceof AppError) {
        return errorToHandle;
    }
    if (errorToHandle instanceof Error) {
        const appError = new AppError(errorToHandle.name, errorToHandle.message);
        appError.stack = errorToHandle.stack;
        return appError;
    }
    // meaning it could be any type,
    const inputType = typeof errorToHandle;
    return new AppError("general-error", `Error Handler received a none error instance with type - ${inputType}, value - ${util.inspect(errorToHandle)}`);
};
const errorHandler = (err, _, res, next) => {
    if (typeof err === "object") {
        const error = err;
        if (error.isTrusted === undefined || error.isTrusted === null) {
            error.isTrusted = true; // Error during a specific request is usually not fatal and should not lead to process exit
        }
    }
    // ✅ Best Practice: Pass all error to a centralized error handler so they get treated equally
    handleError(err);
    res
        .status(err.HTTPStatus ?? 500)
        .json({ message: err.message, errors: err.errors })
        .end();
};
exports.errorHandler = errorHandler;
