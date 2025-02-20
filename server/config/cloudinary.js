import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
    try {
        if (!process.env.CLOUDINARY_NAME || 
            !process.env.CLOUDINARY_API_KEY || 
            !process.env.CLOUDINARY_API_SECRET) {
            throw new Error('Cloudinary credentials missing in environment variables');
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        console.log('Cloudinary configured successfully');
    } catch (error) {
        console.error(`Cloudinary configuration error: ${error.message}`);
        process.exit(1);
    }
};

export default connectCloudinary;