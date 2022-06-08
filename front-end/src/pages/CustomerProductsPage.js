import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
// import getTokenData from '../services/getTokenData';

export default function ProductsPage() {
  const { name } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar className="navBar">
        <a className="navBar-a" href="/customer/checkout">
          Produtos
        </a>
        <a className="navBar-a" href="/customer/orders">
          {' '}
          Meus Pedidos
        </a>
        <a
          data-testid="data-testid='customer_products__element-navbar-user-full-name'"
          className="navBar-a"
          href="/register"
        >
          { name }
        </a>
        <a
          data-testid="customer_products__element-navbar-link-logout"
          className="navBar-a"
          onClick={ () => {
            localStorage.clear();
            navigate('../login', { replace: true });
          } }
          href="/login"
        >
          Sair
        </a>
      </Navbar>
    </div>
  );
}
