import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import AppContext from '../context/AppContext';
import getTokenData from '../services/getTokenData';

export default function ProductsPage() {
  const { token } = useContext(AppContext);
  const [username, setUsername] = useState('');

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
        <a className="navBar-a" href="/customer/checkout">
          Produtos
        </a>
        <a className="navBar-a" href="/customer/orders">
          {' '}
          Meus Pedidos
        </a>
        <a className="navBar-a" href="/register">
          {username}
        </a>
        <Link
          className="navBar-a"
          to="/login"
          onClick={ () => { localStorage.clear(); } }
          replace
        >
          Sair
        </Link>
      </Navbar>
    </div>
  );
}
