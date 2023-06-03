"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
// Read more about envalid here: https://www.npmjs.com/package/envalid
/**
 * This file is used to validate the environment variables.
 */
const env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)(),
    LOG_LEVEL: (0, envalid_1.str)({ default: "info" }),
    MONGO_URI: (0, envalid_1.url)(),
    NODE_ENV: (0, envalid_1.str)({ default: "development" }),
    JWT_SECRET: (0, envalid_1.str)(),
    JWT_EXPIRE: (0, envalid_1.str)({ default: "30d" }),
    JWT_COOKIE_EXPIRE: (0, envalid_1.num)({ default: 30 }),
});
exports.default = env;
