import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import CustomerProductsPage from '../pages/CustomerProductsPage';
export default function RandomComponent() {
  return(
    useRoutes([
      {path:'/', element: <Navigate to="/login" replace /> },
      {path:"/login", element: <LoginPage replace /> },
      {path:"/register", element: <RegisterPage /> },
      {path:"/customer/products", element: <CustomerProductsPage /> }
    ])
  )
}
