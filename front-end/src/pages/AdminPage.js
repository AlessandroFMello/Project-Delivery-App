import React, { useContext, useState } from 'react';
import NameInput from '../components/administrator/NameInput';
import EmailInput from '../components/administrator/EmailInput';
import PasswordInput from '../components/administrator/PasswordInput';
import RoleInput from '../components/administrator/RoleInput';
import AppContext from '../context/AppContext';
import createUser from '../services/apiAdminCreate';

export default function AdminPage() {
  const {
    name, setName, email, setEmail, password, setPassword, role, setRole,
  } = useContext(AppContext);
  const [invalidRegister, setInvalidRegister] = useState(false);
  const nameInStorage = JSON.parse(localStorage.getItem('user'));

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

    const { token } = await JSON.parse(localStorage.getItem('user'));

    const newUser = await createUser({ name, email, password, role }, token, 'user');
    if (newUser.message) {
      setInvalidRegister(true);
    }
    setName('');
    setEmail('');
    setPassword('');
    setRole('customer');
  }

  return (
    <div>
      <nav className="navBar">
        <a
          className="navBar-a"
          href="/customer/checkout"
        >
          Gerenciar Usuários
        </a>
        <a
          className="navBar-a"
          href="/register"
        >
          {!nameInStorage
            ? name
            : nameInStorage.name}
        </a>
        <a
          className="navBar-a"
          onClick={ () => {
            localStorage.clear();
            navigate('/login');
          } }
          href="/login"
        >
          Sair
        </a>
      </nav>
      <div className="register-page-container" onSubmit={ (e) => onSubmitUser(e) }>
        <div className="register-items-container">
          Cadastrar novo usuário
          <form className="register-form">
            <NameInput />
            <EmailInput />
            <PasswordInput />
            <RoleInput />
            <button
              data-testid="admin_manage__button-register"
              type="submit"
              disabled={ validateRegister() }
            >
              Cadastrar
            </button>
          </form>
          {
            invalidRegister
              ? (
                <p
                  data-testid="admin_manage__element-invalid-register"
                >
                  Usuário já existente
                </p>
              )
              : null
          }
        </div>
      </div>

    </div>
  );
}
