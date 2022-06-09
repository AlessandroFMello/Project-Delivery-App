import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import apiGetAll from '../services/apiGetAll';
import AppContext from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { name, cart } = useContext(AppContext);
  const [disableCartBtn, setDisableCartBtn] = useState(true);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const allProducts = await apiGetAll('products');
        setProducts(allProducts);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const min = 0.001;
    if (totalCost <= min) {
      setDisableCartBtn(true);
    } else {
      setDisableCartBtn(false);
    }
  }, [totalCost]);

  useEffect(() => {
    function sumPrices() {
      let sum = 0;
      cart.forEach(({ price, quantity }) => {
        sum += (Number(price) * quantity);
      });

      setTotalCost(sum.toFixed(2));
    }
    sumPrices();
  }, [cart]);

  return (
    <div>
      <Navbar className="navBar">
        <a
          className="navBar-a"
          href="/customer/checkout"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </a>
        <a
          className="navBar-a"
          href="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          {' '}
          Meus Pedidos
        </a>
        <a
          className="navBar-a"
          href="/register"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {name}
        </a>
        <a
          data-testid="customer_products__element-navbar-link-logout"
          className="navBar-a"
          onClick={ () => {
            localStorage.clear();
            navigate('/login');
          } }
          href="/login"
        >
          Sair
        </a>
      </Navbar>
      {products.map((product) => (
        <ProductCard
          key={ product.id }
          product={ product }
        />
      ))}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ disableCartBtn }
        onClick={ () => { navigate('/customer/checkout'); } }
      >
        Ver Carrinho: R$
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { totalCost.toString().replace('.', ',') }
        </span>
      </button>
    </div>
  );
}
