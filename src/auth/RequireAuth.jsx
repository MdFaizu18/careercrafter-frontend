import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const RequireAuth = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  const isAuthenticated = auth?.isAuthenticated && auth?.accessToken;

  console.log('RequireAuth isAuthenticated:', isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
