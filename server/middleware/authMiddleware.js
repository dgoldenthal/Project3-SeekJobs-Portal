import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Company from '../models/Company.js';

// Protect User Routes
export const protectUser = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.json({ success: false, message: 'Not authorized' });
        }
    }

    if (!token) {
        res.json({ success: false, message: 'Not authorized, no token' });
    }
};

// Protect Company Routes
export const protectCompany = async (req, res, next) => {
    // Getting Token From Headers
    const token = req.headers.token;

    if (!token) {
        return res.json({ success: false, message: 'Not authorized, Login Again' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.company = await Company.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};