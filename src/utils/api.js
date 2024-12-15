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

  console.log('Registration response:', result);

    try {
      console.log('Sending registration data:', userData);

      
        const response = await api.post('/api/auth/register', userData);
        console.log('Registration response:', response.data);
        return {
          success: true,
          message: response.data.message,
          data: response.data
      };
    } catch (error) {
      console.error('API Error:', error.response?.data || error);
      
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        error: error.response?.data?.error || error.message
      };
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
