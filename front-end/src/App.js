import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerOrdersPage from './pages/CustomerOrdersPage';
import CustomerProductsPage from './pages/CustomerProductsPage';
import CustomerCheckoutPage from './pages/CustomerCheckoutPage';
import AdminPage from './pages/AdminPage';
import CustomerProductsDetailPage from './pages/CustomerProductsDetailPage';
import SellerOrdersPage from './pages/SellerOrdersPage';

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
        path="customer/orders/:id"
        element={ <CustomerProductsDetailPage /> }
      />
      <Route
        exact
        path="seller/orders"
        element={ <SellerOrdersPage /> }
      />
      <Route
        exact
        path="customer/products"
        element={ <CustomerProductsPage /> }
      />
      <Route
        exact
        path="customer/checkout"
        element={ <CustomerCheckoutPage /> }
      />
      <Route
        exact
        path="admin/manage"
        element={ <AdminPage /> }
      />
    </Routes>
  );
}

export default App;
