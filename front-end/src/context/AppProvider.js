import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [orders, setOrders] = useState([]);
  const [quantity, setQuantity] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [products, setProducts] = useState([]);
  const [cost, setCost] = useState(0);
  const [lastValue, setLastValue] = useState(0);

  const context = {
    email,
    setEmail,
    password,
    setPassword,
    visible,
    setVisible,
    name,
    setName,
    role,
    setRole,
    token,
    setToken,
    orders,
    setOrders,
    quantity,
    setQuantity,
    products,
    setProducts,
    cost,
    setCost,
    lastValue,
    setLastValue,
  };

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
