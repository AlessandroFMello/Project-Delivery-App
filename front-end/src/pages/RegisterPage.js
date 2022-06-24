import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailInput from '../components/register/EmailInput';
import PasswordInput from '../components/register/PasswordInput';
import NameInput from '../components/register/NameInput';
import AppContext from '../context/AppContext';
import createUser from '../services/apiCreate';

export default function RegisterPage() {
  const {
    name, email, password,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [invalidRegister, setInvalidRegister] = useState(false);

  function validateRegister() {
    const emailValidationRegex = /\S+@\S+\.\S+/;
    const MIN_PASSWORD = 6;
    const MIN_NAME = 12;
    const passwordValidation = password.length >= MIN_PASSWORD && password.length >= 1;
    const nameValidation = name.length >= MIN_NAME;
    const validatingEmail = emailValidationRegex.test(email);
    const inputValidation = (passwordValidation && nameValidation && validatingEmail);
    return !inputValidation;
  }

  async function onSubmitUser(e) {
    e.preventDefault();

    const newUser = await createUser({ name, email, password }, 'user');
    if (newUser.message) {
      setInvalidRegister(true);
    } else {
      navigate('../customer/products', { replace: true });
    }
  }

  return (
    <div className="register-page-container">
      <div className="register-items-container">
        <form className="register-form" onSubmit={ (e) => onSubmitUser(e) }>
          <NameInput />
          <EmailInput />
          <PasswordInput />
          <button
            data-testid="common_register__button-register"
            variant="success"
            type="submit"
            disabled={ validateRegister() }
            className="buttonRegister"
          >
            Register
          </button>
        </form>
        {
          invalidRegister
            ? (
              <p
                data-testid="common_register__element-invalid_register"
              >
                Usuário já existente
              </p>
            )
            : null
        }
      </div>
    </div>
  );
}
