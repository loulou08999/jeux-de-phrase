jsx
import React, { useState } from 'react';
import AuthModal from './AuthModal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import App from '../App';

const AuthWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <AuthModal
        LoginForm={LoginForm}
        SignupForm={SignupForm}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  return <App />;
};

export default AuthWrapper;