import PropTypes from 'prop-types';
import React from 'react';

export default function ProductDetail({ sale }) {
  const dateArray = sale.saleDate.split('T')[0].split('-');
  return (
    <div>
      <p
        data-testid={ `customer_orders__element-order-id--${sale.id}` }
      >
        {sale.id}
      </p>
      <p
        data-testid={ `customer_orders__element-delivery-status--${sale.id}` }
      >
        {sale.status}
      </p>
      <p
        data-testid={ `customer_orders__element-order-date--${sale.id}` }
      >
        {`${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`}
      </p>
      <p
        data-testid={ `customer_orders__element-card-price--${sale.id}` }
      >
        {(Number(sale.totalPrice)).toFixed(2).toString().replace('.', ',')}
      </p>
    </div>
  );
}

ProductDetail.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    saleDate: PropTypes.string.isRequired,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
  }).isRequired,
};
