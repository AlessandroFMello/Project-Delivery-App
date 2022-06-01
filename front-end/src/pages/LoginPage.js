import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import validateUser from '../helpers/validateLogin';

export default function LoginPage(/* { history } */) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [visible, setVisible] = useState(false);

  function validateLogin() {
    const emailValidationRegex = /\S+@\S+\.\S+/;
    const MIN_PASSWORD = 6;
    const validatingEmail = emailValidationRegex.test( email);
    const passwordValidation = password.length >= MIN_PASSWORD;
    const inputValidation = (validatingEmail && passwordValidation);
    return !inputValidation;
  }

  async function onSubmitLogin(e) {
    e.preventDefault();
    // faz requisição para o backend
    await validateUser({ email, password });
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
          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">
              <Form.Control
                id="email"
                onChange={ ({ target }) => setEmail(target.value) }
                placeholder="Enter e-mail"
                type="email"
                value={ email.email }
                required
              />
            </Form.Label>
          </Form.Group>
          <div className="input-format">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">
                <Form.Control
                  id="password"
                  type={ !visible ? 'password' : 'text' }
                  onChange={ ({ target }) => setPassword(target.value) }
                  placeholder="Enter password"
                  value={ password.password }
                  required
                />
              </Form.Label>
            </Form.Group>

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
            variant="success"
            type="submit"
            disabled={ validateLogin() }
          >
            Entrar
          </Button>
        </Form>
      </div>
    </div>
  );
}
