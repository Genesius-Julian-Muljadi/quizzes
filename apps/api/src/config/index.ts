import { config } from "dotenv";

config({
    path: ".env",
});

export const {
    PORT,
    DATABASE_URL,
    DIRECT_URL,
    SECRET_KEY,
    BASE_WEB_URL,
} = process.env;