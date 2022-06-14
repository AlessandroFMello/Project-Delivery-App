import React, { useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import getAll from '../services/apiGetAll';
import create from '../services/apiCreateSemPassword';

export default function CheckoutPage() {
  const { cart } = useContext(AppContext);
  const [disable, setDisable] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState(0);
  // const navigate = useNavigate();
  const [newCart, setNewCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState({});

  function handleRemove(index) {
    const aux = [...newCart];
    aux.splice(index, 1);
    setNewCart(aux);
  }

  function handleDisableText(event) {
    const { value } = event.target;
    setDeliveryAddress(value);
    if (deliveryAddress && deliveryNumber) {
      setDisable(false);
    }
    if (!deliveryAddress && deliveryNumber) {
      setDisable(true);
    }
  }
  function handleDisableNumber(event) {
    const { value } = event.target;
    setDeliveryNumber(Number(value));
    if (deliveryNumber && deliveryAddress) {
      setDisable(false);
    }
    if ((!deliveryNumber && deliveryAddress) || deliveryNumber < 1) {
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
            className="item"
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
    setSeller(allSellers[0]);
  }

  useEffect(() => {
    getAllSellers();
  }, []);

  async function onSubmitSale(e) {
    e.preventDefault();
    const userId = await getUserId();
    console.log(e.target);
    const saleData = {
      userId,
      sellerId: seller.id,
      totalCost,
      deliveryAddress,
      deliveryNumber,
    };

    await create(saleData, 'sales');
    // const sale = await apiCreate(data, 'sales');
    // navigate(
    //   `../customer/orders/${index + 1}`,
    //   { replace: false },
    // );
  }
  return (
    <div>
      {/* <div className="item2">item</div>
      <div className="item2">Descrição</div>
      <div className="item2">Quantidade</div>
      <div className="item2">Valor Unitário</div>
      <div className="item2">Sub-total</div>
      <div className="item2">Remover Item</div> */}
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
        >
          Total:
          { totalCost.toFixed(2).replace('.', ',') }
        </div>
        <select
          data-testid="customer_checkout__select-seller"
          onChange={ (e) => setSeller(e.target.value) }
          value={ seller }
        >
          Pessoa Vendedora Responsável:
          {sellers.map(({ id, name }) => (
            <option key={ id } value={ id }>{name}</option>
          ))}
        </select>
        <div> Endereço </div>
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          onChange={ (event) => handleDisableText(event) }
          value={ deliveryAddress }
        />
        <div> Número </div>
        <input
          data-testid="customer_checkout__input-addressNumber"
          type="number"
          onChange={ (event) => handleDisableNumber(event) }
          min="1"
          value={ deliveryNumber }
        />
        <button
          data-testid="customer_checkout__button-submit-order"
          type="submit"
          disabled={ disable }
        >
          FINALIZAR O PEDIDO
        </button>
      </form>
    </div>
  );
}
