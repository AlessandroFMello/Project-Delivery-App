import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function CheckoutPage() {
  const { cart, setCart } = useContext(AppContext);
  const navigate = useNavigate();

  function handleRemove(index) {
    const aux = [...cart];
    aux.splice(index, 1);
    setCart(aux);
  }

  function cartCheckout(element, index) {
    if (element.quantity > 0) {
      return (
        <div>
          <div>
            <p className="item">{element.id}</p>
            <p className="item">{element.name}</p>
            <p className="item">{element.quantity}</p>
            <p className="item">{element.price.replace('.', ',')}</p>
            <p className="item">{element.price * element.quantity}</p>
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

      <button
        type="button"
        onClick={ () => navigate(`../customer/orders/${id}`, { replace: false }) }
      >
        FINALIZAR O PEDIDO

      </button>
      <div> Valor Total </div>
    </div>
  );
}
