import React, { useState } from 'react';

import './order-creating-checkbox.css';

const OrderCreatingCheckbox = ({ onChange }) => {

  const [checked, setChecked] = useState(false);

  const soldCheckbox = ({ target: { checked } }) => {
    setChecked(checked);
    onChange(checked);
  };

  return (
    <div className="order-creating-checkbox">
      <input type="checkbox" checked={checked} onChange={soldCheckbox}/>
      <label>Нет отчества</label>
    </div>
  );
};

export default OrderCreatingCheckbox;