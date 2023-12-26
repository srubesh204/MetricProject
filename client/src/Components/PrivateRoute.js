import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = sessionStorage.getItem('loggedIn'); // Retrieve session storage data

  return (
    <Route
      {...rest}
      element={isLoggedIn ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
