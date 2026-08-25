import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
    throw new Error("PORT no is not defined");
}

if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not defined");
}

if (!process.env.CLERK_WEBHOOK_KEY) {
    throw new Error("CLERK_WEBHOOK_KEY is not defined");
}

if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error("CLOUDINARY_CLOUD_NAME is not defined");
}

if (!process.env.CLOUDINARY_API_KEY) {
    throw new Error("CLOUDINARY_API_KEY is not defined");
}

if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error("CLOUDINARY_API_SECRET is not defined");
}

const config = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    CLERK_WEBHOOK_KEY: process.env.CLERK_WEBHOOK_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
}

export default config;