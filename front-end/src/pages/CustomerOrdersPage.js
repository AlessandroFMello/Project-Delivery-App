import React from 'react';
import { CardGroup } from 'react-bootstrap';
import OrderCard from '../components/OrderCard';

export default function CustomerOrdersPage() {
  return (
    <div className="customer-orders-page-container">
      <div className="customer-orders-topbar-container">
        {/* Não sei se alguém já fez essa parte então vou deixar em branco por agora */}
      </div>
      <div className="customer-orders-main-container">
        <CardGroup>
          <OrderCard />
        </CardGroup>
      </div>
    </div>
  );
}
