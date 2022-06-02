import { Form } from 'react-bootstrap';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function EmailInput() {
  const { email, setEmail } = useContext(AppContext);
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor="email">
        <Form.Control
          id="email"
          data-testid="common_login__input-email"
          onChange={ ({ target }) => setEmail(target.value) }
          placeholder="Enter e-mail"
          type="email"
          value={ email }
          required
        />
      </Form.Label>
    </Form.Group>
  );
}
