import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export const protectCompany = (req, res, next) => {
    if (!req.user || req.user.role !== 'recruiter') {
        return res.status(403).json({ message: 'Access denied. Recruiter role required.' });
    }
    next();
};
