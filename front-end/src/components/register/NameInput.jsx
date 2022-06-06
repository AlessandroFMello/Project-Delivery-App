import { Form } from 'react-bootstrap';
import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

export default function NameInput() {
  const { name, setName } = useContext(AppContext);
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor="name">
        <Form.Control
          id="name"
          data-testid="common_register__input-name"
          onChange={ ({ target }) => setName(target.value) }
          placeholder="Enter name"
          type="name"
          value={ name }
          required
        />
      </Form.Label>
    </Form.Group>
  );
}
