import React, { useContext } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import EmailInput from './login/EmailInput';
import PasswordInput from './login/PasswordInput';
import getToken from '../services/getToken';
import AppContext from '../context/AppContext';
import getTokenData from '../services/getTokenData';

export default function LoginForm() {
  const {
    visible, setVisible, email, setEmail,
    password, setPassword, setToken, setInvalidUser,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const routeToNavigate = {
    administrator: '../admin/manage',
    seller: '../seller/orders',
    customer: '../customer/products',
  };

  function validateLogin() {
    const emailValidationRegex = /\S+@\S+\.\S+/;
    const MIN_PASSWORD = 6;
    const validatingEmail = emailValidationRegex.test(email);
    const passwordValidation = password.length >= MIN_PASSWORD;
    const inputValidation = (validatingEmail && passwordValidation);
    return !inputValidation;
  }

  async function setProfileData(token) {
    const { id, name, role } = await getTokenData(token);
    const userStorage = localStorage.getItem('user');
    if (userStorage === null) {
      try {
        localStorage.setItem('user', JSON.stringify({ id, name, email, role, token }));
        localStorage.setItem('isLogged', true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function onSubmitLogin(e) {
    e.preventDefault();
    const token = await getToken({ email, password });

    if (typeof token === 'string') {
      setToken(token);
      setEmail('');
      setPassword('');
      await setProfileData(token);
      const { role } = await getTokenData(token);
      if (routeToNavigate[role]) {
        navigate(`${routeToNavigate[role]}`, { replace: true });
      }
    } else {
      setInvalidUser(true);
    }
  }

  return (
    <form className="login-form" onSubmit={ (e) => onSubmitLogin(e) }>
      <EmailInput />
      <div className="input-format">
        <PasswordInput />
        <button
          type="button"
          onClick={ () => setVisible(!visible) }
          className="button-visible"
        >
          {
            !visible
              ? <AiOutlineEyeInvisible className="icon-eye" />
              : <AiOutlineEye className="icon-eye" />
          }
        </button>
      </div>
      <button
        data-testid="common_login__button-login"
        variant="success"
        type="submit"
        disabled={ validateLogin() }
        className="buttonLogin"
      >
        LOGIN
      </button>
      <button
        className="buttonLogin"
        data-testid="common_login__button-register"
        variant="success"
        type="button"
        onClick={ () => navigate('../register', { replace: false }) }
      >
        Ainda não tenho conta
      </button>
    </form>
  );
}
