import React from 'react';
import { Button, Form } from 'react-bootstrap';
import EmailInput from '../components/register/EmailInput';
import PasswordInput from '../components/register/PasswordInput';
import NameInput from '../components/register/NameInput';

export default function RegisterPage() {
  return (

    <div className="register-page-container">
      <div className="register-items-container">

        <Form className="register-form" onSubmit={ (e) => onSubmitLogin(e) }>
          <NameInput />
          <EmailInput />
          <PasswordInput />
          <Button
            data-testid="common_register__button-register"
            variant="success"
            type="button"
            onClick={ () => console.log('cadastrar') }
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}
