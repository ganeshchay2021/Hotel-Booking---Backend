import mongoose from "mongoose";
import config from '../Config/config.js';

async function dbConnection() {
    try {
        mongoose.connection.on('connected', () => console.log("Database connected..!"));
        await mongoose.connect(config.MONGO_URL);
    } catch (error) {
        console.error(error.message);
    }

}

export default dbConnection;