import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function CheckoutPage() {
  const { quantity, products } = useContext(AppContext);

  function quantityTrue(amount, amountIndex) {
    if (amount > 0) {
      return products.map((product, index) => (
        <div>
          <div>{quantityOfProdutucs(product, index, amountIndex, amount)}</div>
        </div>
      ));
    }
  }
  function handleRemove(index, amountIndex) {
    // for (let i = 0; i < amountIndex.length; i += 1) {
    //   if (amountIndex[i] === index) {
    //     amountIndex.splice(i, 1);
    //     return;
    //   }
    // }
  }

  function quantityOfProdutucs(product, index, amountIndex, amount) {
    if (index === amountIndex) {
      return (
        <div>
          <p className="item">{product.id}</p>
          <p className="item">{product.name}</p>
          <p className="item">{amount}</p>
          <p className="item">{product.price.replace('.', ',')}</p>
          <p className="item">{product.price * amount}</p>
          <button
            className="item"
            type="button"
            onClick={ () => handleRemove(index, amountIndex) }
          >
            Remover

          </button>
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
      {quantity.map((amount, index) => (
        <div>
          <p
            data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
          >
            {quantityTrue(amount, index)}

          </p>
        </div>
      ))}
      <button
      type="button"
      onClick={ () => navigate(`../customer/orders/${id}`, { replace: false }) }
      >FINALIZAR O PEDIDO</button>
    </div>
  );
}
