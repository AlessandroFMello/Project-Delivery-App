import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

export default function ProductCard({ product }) {
  const { cart, setCart, totalCost, setTotalCost } = useContext(AppContext);
  const [quantity, setQuantity] = useState(0);
  const [lastValue, setLastValue] = useState(0);

  // useEffect(() => {
  //   function updateQuantity() {
  //     const newProduct = {
  //       id: product.id,
  //       name: product.name,
  //       price: product.price,
  //       quantity: 0,
  //     };
  //     cart.push({ ...newProduct });
  //   }
  //   if (quantity > 0) {
  //     updateQuantity();
  //   }
  // }, [quantity, cart, setCart, product]);

  useEffect(() => {
    const newProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 0,
    };
    cart.push(newProduct);
    setCart([...cart]);
  }, []);

  useEffect(() => {
    const cartItem = cart.find((c) => c.id === product.id);
    cart[cart.indexOf(cartItem)].quantity = quantity;
    setCart([...cart]);
  }, [quantity, product]);

  function handleChange({ target }, price) {
    const { value } = target;
    const regexAZ = /^\d+$/;
    if (regexAZ.test(value) || Number(value) === 0) {
      setQuantity(Number(value));
      setLastValue(+price * Number(value));
      setTotalCost((totalCost - lastValue) + (+price * Number(value)));
    }
  }

  function handleIncrement(price) {
    setQuantity(quantity + 1);
    setLastValue(+price * quantity);
    setTotalCost((initialCost) => initialCost + +price);
  }

  function handleDecrement(price) {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setLastValue(+price * quantity);
      setTotalCost((initialCost) => initialCost - +price);
    }
  }

  return (
    <div>
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
      <button
        onClick={ () => handleDecrement(product.price) }
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
        type="button"
      >
        -
      </button>
      <input
        type="text"
        pattern="/^\d+$/"
        onChange={ (event) => handleChange(event, product.price) }
        value={ quantity }
        data-testid={ `customer_products__input-card-quantity--${product.id}` }
      />
      <button
        onClick={ () => handleIncrement(product.price) }
        data-testid={ `customer_products__button-card-add-item--${product.id}` }
        type="button"
      >
        +
      </button>
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
