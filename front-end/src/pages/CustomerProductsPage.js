import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import getTokenData from '../services/getTokenData';
import apiGetAll from '../services/apiGetAll';

export default function ProductsPage() {
  const { token } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await apiGetAll('products');
        setProducts(allProducts);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
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
      {console.log(products)}
      {products.map((product) => (
        <div key={ product.id }>
          <p
            data-testid={ `customer_products__element-card-title-${product.id}` }
          >
            { product.name }
          </p>
          <p
            data-testid={ `customer_products__element-card-price-${product.id}` }
          >
            { product.price.replace('.', ',') }
          </p>
          <img
            data-testid={ `customer_products__img-card-bg-image-${product.id}` }
            src={ product.url_image }
            alt={ product.name }
          />
        </div>
      ))}
    </div>
  );
}
