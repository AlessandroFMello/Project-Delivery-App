import { Form } from 'react-bootstrap';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export function emailInput() {
  const { email, setEmail } = useContext(AppContext);
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor="email">
        <Form.Control
          id="email"
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
export function passwordInput() {
  const { password, setPassword, visible } = useContext(AppContext);
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor="password">
        <Form.Control
          id="password"
          type={ !visible ? 'password' : 'text' }
          onChange={ ({ target }) => setPassword(target.value) }
          placeholder="Enter password"
          value={ password }
          required
        />
      </Form.Label>
    </Form.Group>
  );
}
