import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import AppContext from '../context/AppContext';

export default function LoginPage(/* { history } */) {
  const { invalidUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logged = localStorage.getItem('isLogged');
    const routeToNavigate = {
      administrator: '../admin/manage',
      seller: '../seller/orders',
      customer: '../customer/products',
    };

    if (logged === 'true') {
      const { role } = JSON.parse(localStorage.getItem('user'));
      navigate(`${routeToNavigate[role]}`, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-page-container">
      <div className="login-items-container">
        <LoginForm />
        {
          invalidUser
            ? <p data-testid="common_login__element-invalid-email">Usuário inválido</p>
            : null
        }
      </div>
    </div>
  );
}
