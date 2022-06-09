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
  function quantityOfProdutucs(product, index, amountIndex, amount) {
    if (index === amountIndex) {
      console.log(product);
      console.log(product.id);
      console.log(product.name);
      console.log(product.price.replace('.', ','));
      console.log(product.price * amount);
      return (
        <div>
          <p>{product.id}</p>
          <p>{product.name}</p>
          <p>{product.price.replace('.', ',')}</p>
          <p>{product.price * amount}</p>
          <p>{amount}</p>
          <button>Remover</button>
        </div>
      );
    }
  }

  return (
    <div>
      <div>Quantidade</div>
      {quantity.map((amount, index) => (
        <div>
          <p
            data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
          >
            {quantityTrue(amount, index)}

          </p>
        </div>
      ))}
    </div>
  );
}
