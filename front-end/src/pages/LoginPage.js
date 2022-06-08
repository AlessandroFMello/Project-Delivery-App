import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import getToken from '../services/getToken';
import EmailInput from '../components/login/EmailInput';
import PasswordInput from '../components/login/PasswordInput';
import AppContext from '../context/AppContext';
import getTokenData from '../services/getTokenData';

export default function LoginPage(/* { history } */) {
  const [invalidUser, setInvalidUser] = useState(false);
  const {
    visible, setVisible, email, setEmail, setName, setRole,
    password, setPassword, setToken,
  } = useContext(AppContext);

  const navigate = useNavigate();

  function validateLogin() {
    const emailValidationRegex = /\S+@\S+\.\S+/;
    const MIN_PASSWORD = 6;
    const validatingEmail = emailValidationRegex.test(email);
    const passwordValidation = password.length >= MIN_PASSWORD;
    const inputValidation = (validatingEmail && passwordValidation);
    return !inputValidation;
  }

  async function setProfileData(token) {
    const { name, role } = await getTokenData(token);

    setName(name);
    setRole(role);

    const userStorage = localStorage.getItem('user');

    if (userStorage === null) {
      try {
        localStorage.setItem('user', JSON.stringify({ name, email, role, token }));
      } catch (error) {
        console.log(error);
      }
    } else console.log(typeof userStorage);
  }

  async function onSubmitLogin(e) {
    e.preventDefault();
    const token = await getToken({ email, password });

    if (typeof token === 'string') {
      setToken(token);
      setEmail('');
      setPassword('');
      await setProfileData(token);
      navigate('../customer/products', { replace: true });
    } else {
      setInvalidUser(true);
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-items-container">
        <Form className="login-form" onSubmit={ (e) => onSubmitLogin(e) }>
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
          <Button
            data-testid="common_login__button-login"
            variant="success"
            type="submit"
            disabled={ validateLogin() }
          >
            LOGIN
          </Button>
          <Button
            className="login-register-btn"
            data-testid="common_login__button-register"
            variant="success"
            type="button"
            onClick={ () => navigate('../register', { replace: false }) }
          >
            Ainda não tenho conta
          </Button>
        </Form>
        {
          invalidUser
            ? <p data-testid="common_login__element-invalid-email">Usuário inválido</p>
            : null
        }
      </div>
    </div>
  );
}
