import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import validateUser from '../helpers/validateLogin';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import AppContext from '../context/AppContext';

export default function LoginPage(/* { history } */) {
  const [invalidUser, setInvalidUser] = useState(false);
  const {
    visible, setVisible, email, password,
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

  async function onSubmitLogin(e) {
    e.preventDefault();
    // faz requisição para o backend
    const user = await validateUser({ email, password });
    if (user.token) {
      navigate('../customer/products', { replace: true });
    } else {
      setInvalidUser(true);
    }
    // if (user.token) setHasToken(true);
    // else setHasToken(false);
    // history.push('/goToSomewhere');
  }

  function eyePassword() {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false);
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
              onClick={ () => eyePassword() }
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
            data-testid="common_login__button-register"
            variant="success"
            type="button"
            onClick={ () => console.log('register') }
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
