import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Initialize Express
const app = express();

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to database and services
const initializeServer = async () => {
    try {
        await connectDB();
        
        // Try to connect Cloudinary but don't fail if it errors
        try {
            await connectCloudinary();
        } catch (error) {
            console.warn('Warning: Cloudinary connection failed:', error.message);
            console.warn('Application will continue without Cloudinary functionality');
        }
    } catch (error) {
        console.error('Fatal server initialization error:', error);
        process.exit(1);
    }
};

// Initialize server
initializeServer();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});