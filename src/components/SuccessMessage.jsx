// src/components/SuccessMessage.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const SuccessMessage = ({ 
  message = 'Operation completed successfully!', // Provide default message
  redirectTo = '/login', 
  timeout = 3000,
  autoRedirect = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const displayMessage = location.state?.message || message; // Use message from location state if available

  useEffect(() => {
    if (autoRedirect) {
      const timer = setTimeout(() => {
        navigate(redirectTo);
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [navigate, redirectTo, timeout, autoRedirect]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="flex justify-center">
            <CheckCircleIcon 
              className="h-16 w-16 text-green-500" 
              aria-hidden="true"
            />
          </div>
          
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Success!
          </h2>
          
          <p className="mt-2 text-gray-600">
            {displayMessage}
          </p>

          <div className="mt-6 space-y-4">
            <Link
              to="/login"
              className="inline-block w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Back to Login
            </Link>
          </div>
        </div>

        {autoRedirect && (
          <p className="mt-4 text-sm text-gray-500">
            Redirecting in {Math.ceil(timeout/1000)} seconds...
          </p>
        )}
      </div>
    </div>
  );
};

SuccessMessage.propTypes = {
  message: PropTypes.string,
  redirectTo: PropTypes.string,
  timeout: PropTypes.number,
  autoRedirect: PropTypes.bool
};

SuccessMessage.defaultProps = {
  message: 'Operation completed successfully!',
  redirectTo: '/login',
  timeout: 3000,
  autoRedirect: true
};

export default SuccessMessage;
