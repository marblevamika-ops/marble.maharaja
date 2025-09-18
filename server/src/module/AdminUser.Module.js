import mongoose, { mongo } from "mongoose";

const adminUserSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    adminPost: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    }
}, { timestamps: true });

export default mongoose.model('AdminUser', adminUserSchema);