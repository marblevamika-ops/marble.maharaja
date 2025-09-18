import axios from 'axios';
import { data } from 'react-router-dom';

const MAIN_URL = "http://localhost:8080/api";


// ***********
// ** conatct message
// ***********

// Submit Conatct message
export const contactFormApi = async (formData) => {
    try {
        const response = await axios.post(`${MAIN_URL}/contact/submit-contact`, formData);
        return response.data;  // Returns success message or server response
    } catch (error) {
        console.error("Contact form submission error:", error.response?.data || error.message);
        throw error;  // Let the caller handle the error
    }
};

// Get All Conact Message
export const getAllContactMessage = async (data) => {
    try {
        const response = await axios.get(`${MAIN_URL}/contact/get-contact-form-data`, data);
        return response.data;
    } catch (error) {
        console.error("Error in Geting the all contact messages : ", error.message);
        return { success: false };
    }
}


// ***********
// ** Admin
// ***********

// Registoer Admin User
export const registoerApi = async (data) => {
    try {
        const response = await axios.post(`${MAIN_URL}/admin-user/register-admin`, data);

        return response.data;
    } catch (error) {
        console.error("Error in Registering a Admin User ; ", error.response?.data || error.message);
        return { success: false, message: "Registration failed." };
    }
}

// Login Admin User
export const signInApi = async (credentials) => {
    try {
        const response = await axios.post(`${MAIN_URL}/admin-user/login`, credentials);
        return response.data;
    } catch (error) {
        console.error("❌ Error in Login:", error.response?.data || error.message);
        return { success: false, message: "Login failed." };
    }
};

// ✅ Check Auth API
export const checkAuthApi = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("Token not found");

        const response = await axios.get(`${MAIN_URL}/admin-user/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Error in Auth Check:", error.response?.data || error.message);
        return { success: false, message: "Authentication failed." };
    }
};