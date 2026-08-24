import dotenv from "dotenv";
dotenv.config();

if(!process.env.PORT){
    throw new Error("PORT no is not defined");
}

if(!process.env.MONGO_URL){
    throw new Error("MONGO_URL is not defined");
}


if(!process.env.CLERK_WEBHOOK_KEY){
    throw new Error("CLERK_WEBHOOK_KEY is not defined");
}

const config = {
    PORT: process.env.PORT,
    MONGO_URL:process.env.MONGO_URL,
    CLERK_WEBHOOK_KEY:process.env.CLERK_WEBHOOK_KEY,

}

export default config;