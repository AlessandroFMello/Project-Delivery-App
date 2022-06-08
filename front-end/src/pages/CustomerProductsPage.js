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
  const [quantity, setQuantity] = useState([0,0,0,0,0,0,0,0,0,0,0])
  const [cost, setCost] = useState(0)
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

   function handleChange(event, index){
    const arrayQuantity = [... quantity]
    

   }

  function handleIncrement (index, price){
    const arrayQuantity = [... quantity]
     arrayQuantity[index] += 1
    setQuantity(arrayQuantity)
    setCost((initialCost) => initialCost + +price);
  }

  function handleDecrement (index, price){

    const arrayQuantity = [... quantity]
    if(arrayQuantity[index] > 0){
      arrayQuantity[index] -= 1
      setQuantity(arrayQuantity)
      setCost((initialCost) => initialCost - +price);
    }
  }

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
      {products.map((product, index) => (
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
            width='100px'
          />
          <button onClick={() => handleDecrement(index, product.price)}
           data-testid={ `customer_products__button-card-rm-item-${product.id}`}
          >-</button>
          <input
          type="text"   
          /* onInput={"validity.valid||(value='');"} */
          pattern="/^\d+$/"
          onChange={(event) => handleChange(event, index)}
          value={quantity[index]}
          data-testid= {`customer_products__input-card-quantity-${product.id}`}
          />
           <button onClick={() => handleIncrement(index, product.price) }
          data-testid={ `customer_products__button-card-add-item-${product.id}`}
          >+</button>
        </div>
      ))}
      <div>{cost.toFixed(2)}</div>
    </div>
  );
}
