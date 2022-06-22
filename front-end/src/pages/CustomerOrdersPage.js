import React, { useEffect, useState } from 'react';
import apiGetAll from '../services/apiGetAll';
import Header from '../components/Header';

export default function CustomerOrdersPage() {
  const [allSales, setAllSales] = useState([]);

  async function getAllSales() {
    const user = JSON.parse(localStorage.getItem('user'));
    const sales = await apiGetAll(`sales/customer/${user.id}`);
    setAllSales([...sales]);
  }

  useEffect(() => {
    getAllSales();
  }, []);

  return (
    <div>
      <div className="customer-orders-page-container">
        <Header />
        <div className="customer-orders-main-container">
          {allSales.map((sale, index) => (
            <div
              key={ index }
            >
              <p
                data-testid={ `customer_orders__element-order-id-${sale.id}` }
              >
                {sale.id}
              </p>
              <p
                data-testid={ `customer_orders__element-delivery-status-${sale.id}` }
              >
                {sale.status}
              </p>
              <p
                data-testid={ `customer_orders__element-order-date-${sale.id}` }
              >
                {Date(sale.saleDate)}
              </p>
              <p
                data-testid={ `customer_orders__element-card-price-${sale.id}` }
              >
                {sale.totalPrice}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
