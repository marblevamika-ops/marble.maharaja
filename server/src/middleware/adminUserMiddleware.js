import jwt from 'jsonwebtoken';
import AdminUserModule from '../module/AdminUser.Module.js';

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists and has Bearer token
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized. Invalid token format.'
            });
        }

        const token = authHeader.split(' ')[1];

        // Verify token with secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Make sure the decoded payload has an ID
        if (!decoded?.id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token payload.'
            });
        }

        // Fetch the Admin User from DB (exclude password)
        const user = await AdminUserModule.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Admin User not found.'
            });
        }

        // Attach user info to the request object
        req.user = user;

        // Proceed to next middleware or controller
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);

        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.',
            details: error.message
        });
    }
};
