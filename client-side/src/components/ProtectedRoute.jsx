
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuth') === 'true';

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
