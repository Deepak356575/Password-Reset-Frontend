import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Add fallback URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth endpoints
export const registerUser = async (userData) => {
    try {
        // Convert 'name' to 'username' to match backend expectations
        const requestData = {
            username: userData.name, // Converting name to username
            email: userData.email,
            password: userData.password
        };

        const response = await api.post('/api/auth/register', requestData);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with error
            console.error('Registration error:', error.response.data);
            return {
                success: false,
                message: error.response.data.message || 'Registration failed'
            };
        } else if (error.request) {
            // Request made but no response
            console.error('No response received:', error.request);
            return {
                success: false,
                message: 'No response from server'
            };
        } else {
            // Error setting up request
            console.error('Request setup error:', error.message);
            return {
                success: false,
                message: 'Failed to make request'
            };
        }
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/api/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error);
        throw error;
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/api/auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        console.error('Forgot password error:', error.response?.data || error);
        throw error;
    }
};

export const resetPassword = async (token, password) => {
    try {
        const response = await api.post(`/api/auth/reset-password/${token}`, { 
            password 
        });
        return response.data;
    } catch (error) {
        console.error('Reset password error:', error.response?.data || error);
        throw error;
    }
};

export default api;
