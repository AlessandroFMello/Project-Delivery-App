import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

export default function RoleInput() {
  const { role, setRole } = useContext(AppContext);
  return (
    <div>
      <select
        data-testid="admin_manage__select-role"
        onChange={ ({ target }) => setRole(target.value) }
        value={ role }
      >
        <option value="customer">Customer</option>
        <option value="seller">Seller</option>
        <option value="administrator">Administrator</option>
      </select>
    </div>
  );
}
