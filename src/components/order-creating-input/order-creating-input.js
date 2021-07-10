import React from 'react';

import { withValue } from '../hoc';

import './order-creating-input.css';

const OrderCreatingInput = ({ value, handleChange, label, userPhone, required }) => {

  if (userPhone) {
    return (
      <div className="order-creating-input user-phone">
        <input 
          pattern="\+\d{11}"
          type="text" 
          value={value} 
          onChange={handleChange} 
          required/>
        <label>{label}</label>
      </div>
    );
  }

  return (
    <div className="order-creating-input">
      <input 
        type="text" 
        value={value} 
        onChange={handleChange} 
        required={label === "Отчество" && required}/>
      <label>{label}</label>
    </div>
  );
};

export default withValue(OrderCreatingInput);