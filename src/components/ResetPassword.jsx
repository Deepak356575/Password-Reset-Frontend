import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessMessage from './SuccessMessage';

function ResetPassword() {  // Changed to function declaration
  const { token } = useParams();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  console.log("Current token:", token); // Debug log

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validations
      if (!token) {
        throw new Error('Invalid reset token');
      }

      if (!passwords.password || !passwords.confirmPassword) {
        throw new Error('Please fill in all fields');
      }

      if (passwords.password !== passwords.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (passwords.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // API call
      const response = await axios.post(
        `https://password-reset-backend-nuov.onrender.com/api/auth/reset-password/${token}`,
        { newPassword: passwords.password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Reset password response:', response.data);

      if (response.data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.response?.data?.message || err.message || 'An error occurred while resetting password');
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
              disabled={!token}
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
              disabled={!token}
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading || !token}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
