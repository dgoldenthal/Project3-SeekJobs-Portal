import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            console.error('MongoDB connection string is missing in environment variables');
            return false;
        }

        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        return false;
    }
};

export default connectDB;