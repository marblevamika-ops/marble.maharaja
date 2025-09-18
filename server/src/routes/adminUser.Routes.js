import express from 'express';
import { checkAuth, loginAdminUser, registerAdminUser } from '../controllers/AdminUser.Controller.js'
import { verifyToken } from '../middleware/adminUserMiddleware.js';

const router = express.Router();

// Register a new AdminUser
router.post('/register-admin', registerAdminUser);

// Login existing admin user
router.post('/login', loginAdminUser);

// check auth (protected route)
router.get('/me', verifyToken, checkAuth);

export default router;