import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

export default function PasswordInput() {
  const { visible, password, setPassword } = useContext(AppContext);

  return (
    <div>
      <label htmlFor="password">
        <input
          id="password"
          data-testid="admin_manage__input-password"
          type={ !visible ? 'password' : 'text' }
          onChange={ ({ target }) => setPassword(target.value) }
          placeholder="Enter password"
          value={ password }
          required
        />
      </label>
    </div>
  );
}
