import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProdutosPage from './pages/ProdutosPage';
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
        element={ <LoginPage /> }
      />
      <Route
        path="/customer/products"
        element={ <ProdutosPage /> }
      />
    </Routes>
  );
}

export default App;
