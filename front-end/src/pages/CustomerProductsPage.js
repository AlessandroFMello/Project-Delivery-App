import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import getTokenData from '../services/getTokenData';

export default function ProductsPage() {
  const { token } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const profile = async () => {
      try {
        const { name } = await getTokenData(token);
        localStorage.setItem('user', name);
        setUsername(name);
      } catch (error) {
        console.log(error);
      }
    };
    const userStorage = localStorage.getItem('user');
    if (userStorage === null || userStorage === 'undefined') profile();
    else console.log(typeof userStorage);
  }, [token]);

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) setUsername(userStorage);
  }, []);

  return (
    <div>
      <Navbar className="navBar">
        <a className="navBar-a" href="/customer/checkout"
        data-testid='customer_products__element-navbar-link-products'
        >
          Produtos
        </a>
        <a className="navBar-a" href="/customer/orders"
        data-testid='customer_products__element-navbar-link-orders'
        >
          {' '}
          Meus Pedidos
        </a>
        <a className="navBar-a" href="/register"
        data-testid='customer_products__element-navbar-user-full-name'
        >
          {username}
        </a>
        <a
          className="navBar-a"
          data-testid='customer_products__element-navbar-link-logout'
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
