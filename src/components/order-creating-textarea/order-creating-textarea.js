import React from 'react';

import { withValue } from '../hoc';

import './order-creating-textarea.css';

const OrderCreatingTextarea = ({ value, handleChange, label }) => {
  return (
    <div className="order-creating-textarea">
      <textarea value={value} onChange={handleChange} maxLength="1024" required/>
      <label>{label}</label>
    </div>
  );
};

export default withValue(OrderCreatingTextarea);