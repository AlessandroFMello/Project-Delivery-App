import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

export default function EmailInput() {
  const { email, setEmail } = useContext(AppContext);
  return (
    <div>
      <label htmlFor="email">
        <input
          id="email"
          data-testid="admin_manage__input-email"
          onChange={ ({ target }) => setEmail(target.value) }
          placeholder="Enter e-mail"
          type="email"
          value={ email }
          required
        />
      </label>
    </div>
  );
}
