import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function Header() {
  const { name } = useContext(AppContext);
  const nameInStorage = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  return (
    <nav className="navBar">
      <a
        className="navBar-a"
        href="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </a>
      <a
        className="navBar-a"
        href="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        {' '}
        Meus Pedidos
      </a>
      <p
        className="navBar-a"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {!nameInStorage
          ? name
          : nameInStorage.name}
      </p>
      <a
        data-testid="customer_products__element-navbar-link-logout"
        className="navBar-a"
        onClick={ () => {
          localStorage.clear();
          navigate('/login');
        } }
        href="/login"
      >
        Sair
      </a>
    </nav>
  );
}
