"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
/**
 * Load environment variables from .env file. This needs to be done at the very beginning of the application.
 */
const dotenvConfig = dotenv_1.default.config({
    path: path_1.default.join(__dirname, '..', 'env', '.env')
});
if (dotenvConfig.error != null) {
    throw dotenvConfig.error;
}
