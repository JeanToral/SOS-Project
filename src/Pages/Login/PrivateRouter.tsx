import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth.tsx';

const PrivateRoute: React.FC<{ children: React.ReactNode}> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;