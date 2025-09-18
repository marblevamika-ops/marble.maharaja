import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuthApi } from '../Api/Api.js';

const AdminRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            try {
                const result = await checkAuthApi(token);

                if (result.success) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem('adminToken');
                }
            } catch (error) {
                console.error('Auth verification failed:', error);
                setIsAuthenticated(false);
                localStorage.removeItem('adminToken');
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, []);

    if (isLoading) {
        return <div className="page-container"><p>Checking authentication...</p></div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default AdminRoute;
