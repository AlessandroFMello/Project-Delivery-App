import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerOrdersPage from './pages/CustomerOrdersPage';
import CustomerProductsPage from './pages/CustomerProductsPage';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={ <Navigate to="/login" /> }
      />
      <Route
        exact
        path="login"
        element={ <LoginPage replace /> }
      />
      <Route
        exact
        path="register"
        element={ <RegisterPage /> }
      />
      <Route
        exact
        path="customer/orders"
        element={ <CustomerOrdersPage /> }
      />
      <Route
        exact
        path="customer/products"
        element={ <CustomerProductsPage /> }
      />
    </Routes>
  );
}

export default App;
