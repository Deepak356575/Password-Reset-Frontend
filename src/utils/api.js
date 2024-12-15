// src/utils/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth endpoints

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        return await response.json();
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        return await response.json();
    } catch (error) {
        console.error('Forgot password error:', error);
        throw error;
    }
};

export const resetPassword = async (token, password) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/reset-password/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password })
        });
        return await response.json();
    } catch (error) {
        console.error('Reset password error:', error);
        throw error;
    }
};

