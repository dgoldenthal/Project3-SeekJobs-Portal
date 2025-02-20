import User from '../models/User.js';
import Job from '../models/Job.js';
import JobApplication from '../models/JobApplication.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';
import { v2 as cloudinary } from 'cloudinary';

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !imageFile) {
            return res.json({ success: false, message: 'Please provide all required fields' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            image: imageUpload.secure_url
        });

        if (user) {
            res.json({
                success: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    resume: user.resume
                },
                token: generateToken(user._id)
            });
        } else {
            res.json({ success: false, message: 'Invalid user data' });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                resume: user.resume
            },
            token: generateToken(user._id)
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get User Data
export const getUserData = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User Not Found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Apply For Job
export const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.user._id;

        const isAlreadyApplied = await JobApplication.find({ jobId, userId });

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: 'Already Applied' });
        }

        const jobData = await Job.findById(jobId);

        if (!jobData) {
            return res.json({ success: false, message: 'Job Not Found' });
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        });

        res.json({ success: true, message: 'Applied Successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get User's Applications
export const getUserJobApplications = async (req, res) => {
    try {
        const userId = req.user._id;

        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec();

        if (!applications) {
            return res.json({ success: false, message: 'No job applications found for this user.' });
        }

        return res.json({ success: true, applications });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update User Resume
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.user._id;
        const resumeFile = req.file;

        const userData = await User.findById(userId);

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
            userData.resume = resumeUpload.secure_url;
        }

        await userData.save();

        return res.json({ success: true, message: 'Resume Updated' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};