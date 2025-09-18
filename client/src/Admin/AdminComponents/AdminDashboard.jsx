import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthApi } from '../../Api/Api';

export default function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAuth = async () => {
            const result = await checkAuthApi();
            if (!result.success) {
                alert('Authentication required. Please login.');
                navigate('/admin/login');
            } else {
                setIsLoading(false);  // Auth success → Stop loading
            }
        };
        verifyAuth();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
    };

    if (isLoading) {
        return <div className="page-container"><p>Loading...</p></div>;  // Loading indicator
    }

    return (
        <div className='page-container'>
            <h1>Welcome Admin</h1>

 
            {/* More Content */}
            <section>
                <h2>Admin Overview</h2>
                <p>Manage your system settings, users, and content from here.</p>
            </section>

            <section>
                <h2>Recent Activity</h2>
                <ul>
                    <li>User registrations today: 15</li>
                    <li>New content added: 5</li>
                    <li>System alerts: No issues detected</li>
                </ul>
            </section>

            <section>
                <h2>Support</h2>
                <p>For technical support, contact  marblemaharajahelp@gmail.com</p>
            </section>
        </div>
    );
}
