import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import getById from '../services/apiGetById';

export default function CustomerProductsDetailPage() {
  const [sale, setSale] = useState({});
  const [date, setDate] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [name, setName] = useState('');
  const params = useParams();
  const prefix = 'customer_order_details__element-order-details-label';

  function sumPrices() {
    let sum = 0;
    sale.products.forEach((product) => {
      sum += (Number(product.price)
      * Number(product.SalesProducts.quantity));
    });

    setTotalCost(sum);
  }
  useEffect(() => {
    const getSaleById = async () => {
      const saleById = await getById(params.id, 'sales');
      setSale({ ...saleById });
      setDate(sale.saleDate.split('T')[0].split('-').reverse().join('/'));
      setName(sale.seller.name);
      sumPrices();
    };
    getSaleById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sale.saleDate]);

  function renderTableHead() {
    return (
      <thead>
        <tr>
          <td>item</td>
          <td>Descrição</td>
          <td>Quantidade</td>
          <td> Valor Unitário</td>
          <td>Sub-Total</td>
        </tr>
      </thead>
    );
  }

  function renderTableBody() {
    return (
      <tbody>
        {
          sale.products && (
            sale.products.map((product, index) => (
              <tr key={ index }>
                <td
                  data-testid={ `customer_order_details__
            element-order-table-item-number-${index}` }
                >
                  { product.SalesProducts.productId }
                </td>
                <td
                  data-testid={ `customer_order_details__
              element-order-table-name-${index}}` }
                >
                  { product.name }
                </td>
                <td
                  data-testid={ `customer_order_details__
              element-order-table-quantity-${index}}` }
                >
                  { product.SalesProducts.quantity }
                </td>
                <td
                  data-testid={ `customer_order_details__
              element-order-table-sub-total-${index}}` }
                >
                  { product.price }
                </td>
                <td
                  data-testid={ `element-order-total-price-
              ${index}}` }
                >
                  {
                    `R$${((Number(product.price)
                      * Number(product.SalesProducts.quantity))
                      .toFixed(2).toString().replace('.', ','))}`
                  }
                </td>
              </tr>
            ))
          )
        }
      </tbody>
    );
  }

  return (
    <div>
      <Header />
      <div>
        <p>Detalhe do Pedido</p>
      </div>
      <div>
        <div>
          <div
            data-testid={ `${prefix}-order-id` }
          >
            {`Pedido ${sale.id}`}
          </div>
          <div
            data-testid={ `${prefix}-seller-name` }
          >
            { `P.Vend: ${name}` }
          </div>
          <div
            data-testid={ `${prefix}-order-date` }
          >
            {date}
          </div>
          <button
            data-testid={ `${prefix}-delivery-status` }
            onClick={ () => setIsDisabled(false) }
            type="button"
          >
            {sale.status}
          </button>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ () => setIsDisabled(true) }
            data-testid="customer_order_details__button-delivery-check"
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
        <div>
          <table>
            {renderTableHead()}
            {renderTableBody()}
          </table>
        </div>
      </div>
      <div>
        Total:
        <div
          data-testid="customer_order_details__element-order-total-price"
        >
          { totalCost.toFixed(2).toString().replace('.', ',') }
        </div>
      </div>
    </div>
  );
}
