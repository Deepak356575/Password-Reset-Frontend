import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  // Your backend URL
  const BACKEND_URL = 'https://password-reset-backend-nuov.onrender.com'; // Your actual backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate token
    if (!token) {
      setError('Invalid reset token');
      return;
    }

    // Validate passwords
    if (passwords.password !== passwords.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwords.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Sending reset request to:', `${BACKEND_URL}/api/auth/reset-password/${token}`);
      
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/reset-password/${token}`,
        { newPassword: passwords.password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Reset response:', response.data);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('Reset error:', err);
      setError(err.response?.data?.message || 'Error resetting password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isSuccess) {
    return <SuccessMessage 
      message="Password reset successful! Redirecting to login..." 
      redirectTo="/login"
      timeout={3000}
    />;
  }

  return (
    <div className="container">
      <div className="reset-password-form">
        <h2>Reset Password</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="password"
              value={passwords.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
