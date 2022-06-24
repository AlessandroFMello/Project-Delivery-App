import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

export default function ProductCard({ product }) {
  const { cart, setCart } = useContext(AppContext);
  const cartInStorage = JSON.parse(localStorage.getItem('cart'));
  const [quantity, setQuantity] = (
    useState(!cartInStorage ? 0 : cartInStorage[product.id - 1].quantity)
  );

  useEffect(() => {
    const newProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 0,
    };
    cart.push(newProduct);
    setCart([...cart]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cartItem = cart.find((c) => c.id === product.id);
    cart[cart.indexOf(cartItem)].quantity = quantity;
    setCart([...cart]);
    localStorage.setItem('cart', JSON.stringify([...cart]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, product]);

  function handleChange({ target }) {
    const { value } = target;
    const regexAZ = /^\d+$/;
    if (regexAZ.test(value) || Number(value) === 0) {
      setQuantity(Number(value));
    }
  }

  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  function handleDecrement() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <div className="card">
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
        height="100px"
      />
      <section>
        <button
          onClick={ () => handleDecrement() }
          data-testid={ `customer_products__button-card-rm-item-${product.id}` }
          type="button"
          className="buttonNegative"
        >
          -
        </button>
        <input
          type="text"
          pattern="/^\d+$/"
          onChange={ (event) => handleChange(event) }
          value={ quantity }
          data-testid={ `customer_products__input-card-quantity--${product.id}` }
          className="quantity"
        />
        <button
          onClick={ () => handleIncrement() }
          data-testid={ `customer_products__button-card-add-item--${product.id}` }
          type="button"
          className="buttonPositive"
        >
          +
        </button>
      </section>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,
};
