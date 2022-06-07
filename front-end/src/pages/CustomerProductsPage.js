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
        <a
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
