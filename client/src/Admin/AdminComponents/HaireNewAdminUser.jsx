import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registoerApi } from '../../Api/Api.js'; 

export default function HaireNewAdminUser() {
    const [formData, setFormData] = useState({
        adminName: '',
        password: '',
        adminPost: '',
        email: '',
        phone: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await registoerApi(formData);

            if (response.success) {
                alert(response.message || 'Admin user registered successfully.');
                navigate('/admin/dashboard');
            } else {
                alert(response.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Registration API error:', error);
            alert('An unexpected error occurred.');
        }
    };

    return (
        <div className='page-container'>
            <h2>Register New Admin User</h2>

            <input
                type="text"
                name="adminName"
                placeholder="Admin Name"
                value={formData.adminName}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Admin Password"
                value={formData.password}
                onChange={handleChange}
            />

            <input
                type="text"
                name="adminPost"
                placeholder="Admin Post (e.g., System Admin)"
                value={formData.adminPost}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Email (optional)"
                value={formData.email}
                onChange={handleChange}
            />

            <input
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={handleChange}
            />

            <button onClick={handleSubmit}>Register Admin</button>
        </div>
    );
}
