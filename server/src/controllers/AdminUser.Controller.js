import AdminUserModule from "../module/AdminUser.Module.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new Admin User
export const registerAdminUser = async (req, res) => {
    try {
        const { adminName, password, adminPost, email, phone } = req.body;

        if (!adminName || !password || !adminPost || !email || !phone) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists by phone or email
        const existingAdminUser = await AdminUserModule.findOne({
            $or: [{ phone }, { email }]
        });

        if (existingAdminUser) {
            return res.status(400).json({ error: "Phone number or Email already registered" });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new Admin User
        const newAdminUser = new AdminUserModule({
            adminName,
            password: hashedPassword,
            adminPost,
            email,
            phone,
        });

        await newAdminUser.save();

        // Generate JWT Token
        const token = jwt.sign(
            { id: newAdminUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            success: true,
            message: "Admin User registered successfully",
            token,
            adminUser: {
                id: newAdminUser._id,
                adminName: newAdminUser.adminName,
                adminPost: newAdminUser.adminPost,
                email: newAdminUser.email,
                phone: newAdminUser.phone,
            },
        });

    } catch (error) {
        res.status(500).json({
            error: "Server error during registration",
            details: error.message
        });
    }
};

// Login existing admin user
export const loginAdminUser = async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        const user = await AdminUserModule.findOne({ phone } && { email });
        if (!user) {
            return res.status(400).json({
                error: "Invalid contact or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: 'Invalid contact or password'
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            }, process.env.JWT_SECRET_KEY,
            {
                expiresIn: '1d',
            }
        );

        res.status(200).json({
            success: true,
            message: 'Login Successful',
            token,
            user: {
                id: user._id,
                adminName: user.adminName,
                adminPost: user.adminPost,
                email: user.email,
                phone: user.phone,
            },
        });
    } catch (error) {
        res.status(500).json({
            error: 'Server error during login',
            details: error.message
        });
    }
};


// check authentication (used for /auth/me)
export const checkAuth = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        res.status(200).json({
            success: true,
            message: "Admin User authenticated successfully",
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server error during auth check",
            details: error.message
        });
    }
};
