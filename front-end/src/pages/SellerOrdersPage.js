import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SellerProductDetail from '../components/SellerProductDetail';
import apiGetAll from '../services/apiGetAll';

export default function SellerOrdersPage() {
  const [allSales, setAllSales] = useState([]);
  const navigate = useNavigate();

  async function getAllSales() {
    const seller = JSON.parse(localStorage.getItem('user'));
    const sales = await apiGetAll(`sales/seller/${seller.id}`);
    setAllSales([...sales]);
  }

  useEffect(() => {
    getAllSales();
  }, []);

  return (
    <div>
      <div className="seller-orders-page-container">
        <Header />
        <div className="seller-orders-main-container">
          {allSales.map((sale, index) => (
            <button
              key={ index }
              onClick={ () => {
                navigate(`./${sale.id}`);
              } }
              type="button"
            >
              <SellerProductDetail sale={ sale } />
            </button>
          ))}

        </div>
      </div>
    </div>
  );
}
