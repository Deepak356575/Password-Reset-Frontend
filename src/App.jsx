// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SuccessMessage from './components/SuccessMessage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main>
          <Routes>
            {/* Home Route */}
            <Route 
              path="/" 
              element={
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900">
                      Welcome to Password Reset Demo
                    </h1>
                  </div>
                </div>
              } 
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            
            {/* Success Message Route with default message */}
            <Route 
              path="/success" 
              element={
                <SuccessMessage 
                  message="Operation completed successfully!"
                  redirectTo="/login"
                  timeout={3000}
                />
              } 
            />

            {/* 404 Route */}
            <Route 
              path="*" 
              element={
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900">
                      404 - Page Not Found
                    </h1>
                    <p className="mt-4 text-gray-600">
                      The page you're looking for doesn't exist.
                    </p>
                  </div>
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
