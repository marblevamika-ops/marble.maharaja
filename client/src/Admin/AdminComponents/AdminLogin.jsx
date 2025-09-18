import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInApi, checkAuthApi } from '../../Api/Api.js';
import HaireNewAdminUser from './HaireNewAdminUser.jsx';

import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Check if admin is already logged in
    useEffect(() => {
        const verifyAuth = async () => {
            const result = await checkAuthApi();
            if (result.success) {
                navigate('/admin/dashboard');  // Already authenticated → Redirect
            }
        };
        verifyAuth();
    }, [navigate]);

    const handleLogin = async () => {
        if (!email || !password) {
            return alert('Please fill in both fields.');
        }

        try {
            const credentials = { email, password };
            const response = await signInApi(credentials);

            if (response.success) {
                // Save the correct token
                localStorage.setItem('token', response.token);
                alert('Login successful!');
                // Redirect after login
                navigate('/admin/dashboard');
            } else {
                alert(response.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Login API Error:', error);
            alert('An error occurred during login.');
        }
    };

    const handleShowPassword = () => {
        if (showPassword === false) {
            setShowPassword(true);
        } else {
            setShowPassword(false);
        }
    }

    return (
        <div className='AdminLogin'>
            {/* <HaireNewAdminUser /> */}

            <h2>Admin Login</h2>
            <div className='admin-login-form'>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Enter Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-box">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='showPasswordBtn' onClick={handleShowPassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>
                <p>Open Admin throw <span>Contact</span> !</p>

                <button className='btn' onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}
