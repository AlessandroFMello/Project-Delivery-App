import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function CheckoutPage() {
  const { cart } = useContext(AppContext);
  const [disable, setDisable] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [newCart, setNewCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  function handleRemove(index) {
    const aux = [...newCart];
    aux.splice(index, 1);
    setNewCart(aux);
  }

  let text;
  let number;

  function handleDisableText(event) {
    const { value } = event.target;
    text = value.replace(/[^a-z]/gi, '');
    setMessage(text);
    if (message && number) {
      setDisable(false);
    }
    if (!message && number) {
      setDisable(true);
    }
  }
  function handleDisableNumber(event) {
    const { value } = event.target;
    number = value;
    if (number && message) {
      setDisable(false);
    }
    if (!number && message) {
      setDisable(true);
    }
  }

  function populateNewCart() {
    const itemsList = [];
    cart.forEach((cartItem) => {
      if (cartItem.quantity > 0) {
        itemsList.push(cartItem);
      }
    });
    setNewCart([...itemsList]);
  }

  useEffect(() => {
    populateNewCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function SumTotalCost() {
      let sum = 0;
      newCart.forEach((item) => {
        sum += (item.price * item.quantity);
      });
      setTotalCost(sum);
      return sum;
    }
    SumTotalCost();
  }, [newCart]);

  function cartCheckout(element, index) {
    console.log(index);

    return (
      <div>
        <div>
          <p
            data-testid={ `customer_checkout__element-order-table-item-number--${index}` }
            className="item"
          >
            {index + 1}
          </p>
          <p
            data-testid={ `customer_checkout__element-order-table-name--${index}` }
            className="item"
          >
            {element.name}
          </p>
          <p
            data-testid={ `customer_checkout__element-order-table-quantity--${index}` }
            className="item"
          >
            {element.quantity}
          </p>
          <p
            data-testid={ `customer_checkout__element-order-table-unit-price--${index}` }
            className="item"
          >
            {element.price.replace('.', ',')}
          </p>
          <p
            data-testid={ `customer_checkout__element-order-table-sub-total--${index}` }
            className="item"
          >
            {
              (element.price * element.quantity).toFixed(2).replace('.', ',')
            }

          </p>
          <button
            className="item"
            type="button"
            onClick={ () => handleRemove(index) }
            data-testid={ `customer_checkout__element-order-table-remove--${index}` }
          >
            Remover

          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* <div className="item2">item</div>
      <div className="item2">Descrição</div>
      <div className="item2">Quantidade</div>
      <div className="item2">Valor Unitário</div>
      <div className="item2">Sub-total</div>
      <div className="item2">Remover Item</div> */}
      {newCart.map((element, index) => (
        <div
          key={ index }
        >
          {cartCheckout(element, index)}
        </div>
      ))}

      <div
        data-testid="customer_checkout__element-order-total-price"
      >
        Total:
        { totalCost.toFixed(2).replace('.', ',') }
      </div>
      <select
        data-testid="customer_checkout__select-seller"
      >
        Pessoa Vendedora Responsável:
        <option>Fulana Peireira</option>
      </select>
      <div> Endereço </div>
      <input
        data-testid="customer_checkout__input-address"
        type="text"
        onChange={ (event) => handleDisableText(event) }
        value={ message }
      />
      <div> Número </div>
      <input
        data-testid="customer_checkout__input-addressNumber"
        type="number"
        onChange={ (event) => handleDisableNumber(event) }
      />
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ () => navigate(`../customer/orders/${index + 1}`, { replace: false }) }
        disabled={ disable }
      >
        FINALIZAR O PEDIDO
      </button>
    </div>
  );
}
