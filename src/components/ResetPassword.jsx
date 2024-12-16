import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    // Add token validation on mount
    useEffect(() => {
        if (!token) {
            console.error('No token provided in URL');
            setError('Reset token is missing');
        }
    }, [token]);


    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            // Validation
            if (!token) {
                throw new Error('Reset token is missing');
            }

            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }

            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            console.log('Attempting password reset with token:', token);

            const response = await axios({
                method: 'POST',
                url: `https://password-reset-backend-nuov.onrender.com/api/auth/reset-password/${token}`,
                data: { newPassword: password },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            });

            console.log('Reset password response:', response.data);

            if (response.data.status === 'success') {
                setMessage('Password reset successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
          console.error('Reset password error details:', {
              status: error.response?.status,
              statusText: error.response?.statusText,
              data: error.response?.data,
              message: error.message
          });
          
          setError(error.response?.data?.message || 'Error resetting password');
      } finally {
          setIsLoading(false);
      }
  };

    return (
        <div className="container">
            <div className="reset-password-form">
                <h2>Reset Password</h2>
                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                            disabled={isLoading || !token}
                            placeholder="Enter new password"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength="6"
                            disabled={isLoading || !token}
                            placeholder="Confirm new password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="reset-button"
                        disabled={isLoading || !token}
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
