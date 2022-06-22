import PropTypes from 'prop-types';
import React from 'react';

export default function ProductDetail({ sale }) {
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
        {Date(sale.saleDate)}
      </p>
      <p
        data-testid={ `customer_orders__element-card-price-${sale.id}` }
      >
        {sale.totalPrice}
      </p>
    </div>
  );
}

ProductDetail.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    saleDate: PropTypes.isRequired,
    status: PropTypes.string,
    totalPrice: PropTypes.number,
  }).isRequired,
};
