import axios from 'axios';

// Define the API_URL - this was missing in your original file
const API_URL = 'https://password-reset-backend-nuov.onrender.com'; // adjust if your backend URL is different

// Create axios instance with default config
const apiClient = axios.create({ baseURL: 'https://password-reset-backend-nuov.onrender.com', 
  headers: { 'Content-Type': 'application/json' } });

// Add request interceptor for logging
apiClient.interceptors.response.use( response => response, error => 
  { 
    if (error.response) 
      { console.error('CORS error:', error.response.data);

       }
        else if (error.request)
           { 
            console.error('CORS error: No response received');
           }
           else 
           { console.error('Error:', error.message);
           
          } 
return Promise.reject(error); 
} );



// Auth endpoints
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/api/auth/forgot-password', { email });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

export const resetPassword = (token, newPassword) => { return apiClient.post(`/auth/reset-password/${token}`, { password: newPassword }); };

// Add a health check endpoint
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export default api;
