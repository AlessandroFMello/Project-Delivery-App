import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function CheckoutPage() {
  const { cart, setCart } = useContext(AppContext);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  function handleRemove(index) {
    const aux = [...cart];
    aux.splice(index, 1);
    setCart(aux);
  }

  function handleDisable(){
    
  }

  function cartCheckout(element, index) {
    if (element.quantity > 0) {
      return (
        <div>
          <div>
            <p
              data-testid={ `
              customer_checkout__element-order-table-item-number-${index}` }
              className="item"
            >
              {element.id}

            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-name-${index}` }
              className="item"
            >
              {element.name}

            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              className="item"
            >
              {element.quantity}

            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
              className="item"
            >
              {element.price.replace('.', ',')}

            </p>
            <p
              data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
              className="item"
            >
              {(element.price * element.quantity).toFixed(2)}

            </p>
            <button
              className="item"
              type="button"
              onClick={ () => handleRemove(index) }
              data-testid={ `customer_checkout__element-order-table-remove-${index}` }
            >
              Remover

            </button>
          </div>
        </div>
      );
    }
  }
  return (
    <div>
      <div className="item2">item</div>
      <div className="item2">Descrição</div>
      <div className="item2">Quantidade</div>
      <div className="item2">Valor Unitário</div>
      <div className="item2">Sub-total</div>
      <div className="item2">Remover Item</div>
      {cart.map((element, index) => (
        <div
          key={ index }
        >
          {cartCheckout(element, index)}
        </div>
      ))}

      <div
        data-testid="customer_checkout__element-order-total-price"
      >
        Total
      </div>
      <div> Endereço </div>
      <input
        data-testid="customer_checkout__input-address"
        type="text"
      />
      <div> Número </div>
      <input
        data-testid="customer_checkout__input-addressNumber"
        type="number"
      />
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ () => navigate(`../customer/orders/${id}`, { replace: false }) }
        disabled={ disable }
      >
        FINALIZAR O PEDIDO

      </button>
    </div>
  );
}
