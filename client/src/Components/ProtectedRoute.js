import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
