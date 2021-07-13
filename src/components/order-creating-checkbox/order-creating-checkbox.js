import React from 'react';
import { Field } from 'react-final-form';

import './order-creating-checkbox.css';

const OrderCreatingCheckbox = ({ label, name }) => {
  return (
    <div className="order-creating-checkbox">
      <Field name={name} type="checkbox">
        {
          ({ input }) => <input {...input}/>
        }
      </Field>
      <label>{label}</label>
    </div>
  );
};

export default OrderCreatingCheckbox;