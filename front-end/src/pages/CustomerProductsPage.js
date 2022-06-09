import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import apiGetAll from '../services/apiGetAll';
import AppContext from '../context/AppContext';

export default function ProductsPage() {
  const { name, quantity, setQuantity, products, setProducts,
    cost, setCost, lastValue, setLastValue } = useContext(AppContext);
  const navigate = useNavigate();

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
  }, [setProducts]);

  function handleChange({ target }, index, price) {
    const { value } = target;
    const regexAZ = /^\d+$/;
    if (regexAZ.test(value) || Number(value) === 0) {
      const arrayQuantity = [...quantity];
      arrayQuantity[index] = Number(value);
      setQuantity(arrayQuantity);
      setCost((initialCost) => (initialCost - lastValue) + +price * Number(value));
      setLastValue(+price * Number(value));
    }
  }

  function handleIncrement(index, price) {
    const arrayQuantity = [...quantity];
    arrayQuantity[index] += 1;
    setQuantity(arrayQuantity);
    setCost((initialCost) => initialCost + +price);
  }

  function handleDecrement(index, price) {
    const arrayQuantity = [...quantity];
    if (arrayQuantity[index] > 0) {
      arrayQuantity[index] -= 1;
      setQuantity(arrayQuantity);
      setCost((initialCost) => initialCost - +price);
    }
  }

  return (
    <div>
      <Navbar className="navBar">
        <a
          className="navBar-a"
          href="/customer/checkout"
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
        <a
          className="navBar-a"
          href="/register"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {name}
        </a>
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
            width="100px"
          />
          <button
            onClick={ () => handleDecrement(index, product.price) }
            data-testid={ `customer_products__button-card-rm-item-${product.id}` }
            type="button"
          >
            -
          </button>
          <input
            type="text"
            /* onInput={"validity.valid||(value='');"} */
            pattern="/^\d+$/"
            onChange={ (event) => handleChange(event, index, product.price) }
            value={ quantity[index] }
            data-testid={ `customer_products__input-card-quantity--${product.id}` }
          />
          <button
            onClick={ () => handleIncrement(index, product.price) }
            data-testid={ `customer_products__button-card-add-item--${product.id}` }
            type="button"
          >
            +
          </button>
        </div>
      ))}
      <button
        data-testid="customer_products__checkout-bottom-value"
        type="button"
        onClick={ () => navigate('../customer/checkout', { replace: false }) }
      >
        { cost.toFixed(2).replace('.', ',') }
      </button>
    </div>
  );
}
