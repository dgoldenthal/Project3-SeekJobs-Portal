import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import companyRoutes from './routes/companyRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Initialize Express
const app = express();

// Connect to database
const initializeServer = async () => {
    await connectDB();
    await connectCloudinary();
};

// Middlewares
app.use(cors());
app.use(express.json());

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

// Routes
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});