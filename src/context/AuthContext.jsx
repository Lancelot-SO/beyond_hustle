import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

const API_BASE = 'https://api.drboahemaantim.com/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('auth_user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Invalid credentials');
        }

        const authToken = data.token || data.access_token;
        const userData = data.user || { email };

        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        setToken(authToken);
        setUser(userData);

        return data;
    };

    const register = async (firstName, lastName, email, password, password_confirmation) => {
        const name = `${firstName} ${lastName}`;
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                name,
                email,
                password,
                password_confirmation
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Laravel returns validation errors as an object
            if (data.errors) {
                const firstError = Object.values(data.errors)[0];
                throw new Error(Array.isArray(firstError) ? firstError[0] : firstError);
            }
            throw new Error(data.message || 'Registration failed');
        }

        const authToken = data.token || data.access_token;
        const userData = data.user || { name, email };

        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        setToken(authToken);
        setUser(userData);

        return data;
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setToken(null);
        setUser(null);
    };

    const updateUser = (userData) => {
        localStorage.setItem('auth_user', JSON.stringify(userData));
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
