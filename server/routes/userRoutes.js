import express from 'express';
import { getUserData, loginUser, registerUser, updateUserResume, applyForJob, getUserJobApplications } from '../controllers/userController.js';
import { protectUser } from '../middleware/authMiddleware.js';
import upload from '../config/multer.js';

const router = express.Router();

// Auth routes
router.post('/register', upload.single('image'), registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/user', protectUser, getUserData);
router.post('/update-resume', protectUser, upload.single('resume'), updateUserResume);
router.post('/apply', protectUser, applyForJob);
router.get('/applications', protectUser, getUserJobApplications);

export default router;