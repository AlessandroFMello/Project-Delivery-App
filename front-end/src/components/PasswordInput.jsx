import { Form } from 'react-bootstrap';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

const prefix = "common_login__"

export default function PasswordInput() {
  const { password, setPassword, visible } = useContext(AppContext);
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor="password">
        <Form.Control
          id="password"
          data-testid={`input[data-testid='${prefix}input-password']`}
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
