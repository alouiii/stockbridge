import { cleanEnv, port, str, url, num } from "envalid";

const env = cleanEnv(process.env, {
    PORT: port(),
    LOG_LEVEL: str({ default: "info" }),
    MONGO_URI: url(),
    NODE_ENV: str({ default: "development" }),
    JWT_SECRET: str(),
    JWT_EXPIRE: str({default: "30d"}),
    JWT_COOKIE_EXPIRE: num({default: 30}),
});

export default env;
