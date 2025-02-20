import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {
    try {
        if (!process.env.CLOUDINARY_NAME || 
            !process.env.CLOUDINARY_API_KEY || 
            !process.env.CLOUDINARY_API_SECRET) {
            console.warn('Cloudinary credentials missing. Some features may be limited.');
            return false;
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });

        console.log('Cloudinary configured successfully');
        return true;
    } catch (error) {
        console.warn(`Cloudinary configuration warning: ${error.message}`);
        return false;
    }
};

export default connectCloudinary;