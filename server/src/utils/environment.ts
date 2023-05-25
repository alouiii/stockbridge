import { cleanEnv, port, str, url } from "envalid";

const env = cleanEnv(process.env, {
    PORT: port(),
    LOG_LEVEL: str({ default: "info" }),
    MONGO_URI: url(),
    NODE_ENV: str({ default: "development" }),
});

export default env;
