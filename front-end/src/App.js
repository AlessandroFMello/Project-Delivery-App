import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import RegisterPage from './pages/RegisterPage';
// import CustomerOrdersPage from './pages/CustomerOrdersPage';
import CustomerProductsPage from './pages/CustomerProductsPage';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={ <Navigate to="/login" replace /> }
      />
      <Route
        path="/login"
        element={ <LoginPage replace /> }
      />
      <Route
        path="/register"
        element={ <RegisterPage /> }
      />
      {/* <Route
        path="/customer/orders"
        element={ <CustomerOrdersPage /> }
      /> */}
      <Route
        path="/customer/products"
        element={ <CustomerProductsPage /> }
      />
    </Routes>
  );
}

export default App;
