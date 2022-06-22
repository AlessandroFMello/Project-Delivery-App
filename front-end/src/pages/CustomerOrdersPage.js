import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiGetAll from '../services/apiGetAll';
import Header from '../components/Header';
import ProductDetail from '../components/ProductDetail';

export default function CustomerOrdersPage() {
  const [allSales, setAllSales] = useState([]);
  const navigate = useNavigate();

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
            <button
              key={ index }
              onClick={ () => {
                navigate(`./${sale.id}`);
              } }
              type="button"
            >
              <ProductDetail sale={ sale } />
            </button>
          ))}

        </div>
      </div>
    </div>
  );
}
