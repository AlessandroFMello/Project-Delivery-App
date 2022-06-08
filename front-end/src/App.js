import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import CustomerOrdersPage from './pages/CustomerOrdersPage';
import CustomerProductsPage from './pages/CustomerProductsPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import RandomComponent from './components/randomComponent';

function App() {
  return (
      <RandomComponent />
  );
}

export default App;
