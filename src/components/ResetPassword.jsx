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

  // Define your backend URL
  const BACKEND_URL = process.env.REACT_APP_API_URL || 'https://password-reset-backend-nuov.onrender.com/' ; // Replace with your actual backend URL

  const validatePassword = () => {
    if (passwords.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (passwords.password !== passwords.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Debug logs
    console.log('Token:', token);
    console.log('Attempting password reset...');

    if (!validatePassword()) return;

    setIsLoading(true);
    try {
      // Make sure to use the correct backend URL
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/reset-password/${token}`,
        { newPassword: passwords.password }
      );

      console.log('Reset response:', response.data);
      setIsSuccess(true);
    } catch (err) {
      console.error('Reset error:', err);
      setError(err.response?.data?.message || 'Error resetting password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  };

  if (isSuccess) {
    return (
      <SuccessMessage 
        message="Your password has been reset successfully!" 
        redirectTo="/login"
        timeout={3000}
      />
    );
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
