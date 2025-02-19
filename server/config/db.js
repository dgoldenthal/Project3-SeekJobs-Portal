import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("Missing MongoDB connection string in environment variables");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
        process.exit(1);
    }
};

export default connectDB;
