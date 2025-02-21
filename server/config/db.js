import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            console.error('MongoDB connection string is missing');
            return false;
        }

        // Log the URI format (hide credentials)
        const sanitizedUri = mongoURI.replace(
            /(mongodb\+srv:\/\/)([^:]+):([^@]+)@/,
            '$1[username]:[password]@'
        );
        console.log('Attempting MongoDB connection with URI format:', sanitizedUri);

        if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
            throw new Error('Invalid MongoDB URI format');
        }

        const conn = await mongoose.connect(mongoURI, {
            retryWrites: true,
            w: 'majority'
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        return false;
    }
};

export default connectDB;