import dotenv from "dotenv";
import path from "path";

// Load env vars
const dotenvConfig = dotenv.config({
    path: path.join(__dirname, '..', 'env', '.env')
});

if (dotenvConfig.error != null) {
    throw dotenvConfig.error;
}