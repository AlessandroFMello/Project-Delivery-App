import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import getAll from '../services/apiGetAll';
import create from '../services/apiCreateWithToken';
import Header from '../components/Header';

export default function CheckoutPage() {
  const { cart } = useContext(AppContext);
  const [disable, setDisable] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState(0);
  const [newCart, setNewCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState();
  const navigate = useNavigate();

  function handleRemove(index) {
    const aux = [...newCart];
    aux.splice(index, 1);
    setNewCart(aux);
  }

  function handleDisableText(event) {
    const { value } = event.target;
    setDeliveryAddress(value);
    if (value && deliveryNumber) {
      setDisable(false);
    }
    if (!value || !deliveryNumber) {
      setDisable(true);
    }
  }
  function handleDisableNumber(event) {
    const { value } = event.target;
    setDeliveryNumber(Number(value));
    if ((deliveryNumber && deliveryAddress) || value >= 1) {
      setDisable(false);
    }
    if (!(deliveryNumber || deliveryAddress) || value < 1) {
      setDisable(true);
    }
  }

  function populateNewCart() {
    const itemsList = [];
    cart.forEach((cartItem) => {
      if (cartItem.quantity > 0) {
        itemsList.push(cartItem);
      }
    });
    setNewCart([...itemsList]);
  }

  function cartCheckout(element, index) {
    return (
      <div>
        <div>
          <p
            data-testid={ `customer_checkout__element-order-table-item-number--${index}` }
            className="item"
          >
            {index + 1}
          </p>
          <p
            data-testid={ `customer_checkout__element-order-table-name--${index}` }
            className="item"
          >
            {element.name}
          </p>
          <p
            data-testid={ `customer_checkout__element-order-table-quantity--${index}` }
            className="item"
          >
            {element.quantity}
          </p>
          <p
            data-testid={ `customer_checkout__element-order-table-unit-price--${index}` }
            className="item"
          >
            {element.price.replace('.', ',')}
          </p>
          <p
            data-testid={ `customer_checkout__element-order-table-sub-total--${index}` }
            className="item"
          >
            {
              (element.price * element.quantity).toFixed(2).replace('.', ',')
            }

          </p>
          <button
            className={ ('item', 'remove') }
            type="button"
            onClick={ () => handleRemove(index) }
            data-testid={ `customer_checkout__element-order-table-remove--${index}` }
          >
            Remover
          </button>
        </div>
      </div>
    );
  }

  async function getUserId() {
    const user = JSON.parse(localStorage.getItem('user'));
    const getAllUsers = await getAll('user');
    const [selectedUser] = getAllUsers.filter(({ name }) => name === user.name);
    return selectedUser.id;
  }

  async function getAllSellers() {
    const allUsers = await getAll('user');
    const allSellers = allUsers.filter(({ role }) => role === 'seller');
    setSellers(allSellers);
    setSellerId(allSellers[0].id);
  }

  async function onSubmitSale(e) {
    e.preventDefault();
    const userId = await getUserId();
    const { token } = JSON.parse(localStorage.getItem('user'));

    const saleData = {
      userId,
      sellerId: Number(sellerId),
      totalPrice: totalCost,
      deliveryAddress,
      deliveryNumber: deliveryNumber.toString(),
      products: newCart,
    };

    const sale = await create(saleData, token, 'sales');

    if (sale.id) {
      navigate(
        `../customer/orders/${sale.id}`,
        { replace: true },
      );
    }
  }

  useEffect(() => {
    populateNewCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function SumTotalCost() {
      let sum = 0;
      newCart.forEach((item) => {
        sum += (item.price * item.quantity);
      });
      setTotalCost(sum);
      return sum;
    }
    SumTotalCost();
  }, [newCart]);

  useEffect(() => {
    getAllSellers();
  }, []);

  return (
    <div>
      <Header />
      <p className="item2">Item</p>
      <p className="item2">Descrição</p>
      <p className="item2">Quantidade</p>
      <p className="item2">Valor Unitário</p>
      <p className="item2">Sub-total</p>
      <p className="item2">Remover Item</p>
      {newCart.map((element, index) => (
        <div
          key={ index }
        >
          {cartCheckout(element, index)}
        </div>
      ))}
      <form
        onSubmit={ (e) => onSubmitSale(e) }
      >
        <div
          data-testid="customer_checkout__element-order-total-price"
          value={ totalCost.toFixed(2) }
          className="totalPrice"
        >
          Total:
          { totalCost.toFixed(2).replace('.', ',') }
        </div>
        <section className="detail">
          <section>
            <div> Pessoa Vendedora Responsável:</div>
            <select
              data-testid="customer_checkout__select-seller"
              onChange={ (e) => setSellerId(e.target.value) }
              value={ sellerId }
              className="sellerSelect"
            >
              {sellers.map(({ id, name }) => (
                <option key={ id } value={ id }>{name}</option>
              ))}
            </select>
          </section>
          <section className="detailText">
            <div>
              Endereço
            </div>
            <input
              data-testid="customer_checkout__input-address"
              type="text"
              onChange={ (event) => handleDisableText(event) }
              value={ deliveryAddress }
            />
          </section>
          <section className="detailNumber">
            <div> Número </div>
            <input
              data-testid="customer_checkout__input-addressNumber"
              type="number"
              onChange={ (event) => handleDisableNumber(event) }
              min="1"
              value={ deliveryNumber }
              className="detailNumberInput"
            />
          </section>
        </section>
        <button
          data-testid="customer_checkout__button-submit-order"
          type="submit"
          disabled={ disable }
          className="endOfList"
        >
          FINALIZAR O PEDIDO
        </button>
      </form>
    </div>
  );
}
