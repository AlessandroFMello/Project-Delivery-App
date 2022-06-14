import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

export default function NameInput() {
  const { name, setName } = useContext(AppContext);
  return (
    <div>
      <label htmlFor="name">
        <input
          id="name"
          data-testid="admin_manage__input-name"
          onChange={ ({ target }) => setName(target.value) }
          placeholder="Enter name"
          type="name"
          value={ name }
          required
        />
      </label>
    </div>
  );
}
