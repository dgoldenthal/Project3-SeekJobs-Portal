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
        const dbConnected = await connectDB();
        if (!dbConnected) {
            throw new Error('Database connection failed');
        }
        
        // Try Cloudinary connection but continue even if it fails
        await connectCloudinary().catch(err => {
            console.warn('Cloudinary connection warning:', err.message);
        });
        
        return true;
    } catch (error) {
        console.error('Server initialization error:', error.message);
        return false;
    }
};

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// The "catchall" handler
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    const initialized = await initializeServer();
    if (!initialized) {
        console.warn('Server starting with limited functionality');
    }
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();