import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './src/routes/contact.Routes.js';
import adminUserRoutes from './src/routes/adminUser.Routes.js'
import connectDB from './lib/connectDB.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB

app.use('/api/contact', contactRoutes);
app.use('/api/admin-user', adminUserRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
