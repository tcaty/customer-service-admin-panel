import React from 'react';
import { Field } from 'react-final-form';

import './order-creating-textarea.css';

const OrderCreatingTextarea = ({ label, name }) => {
  return (
    <div className="order-creating-textarea">
      <Field name={name} type="text">
        {
          ({ input }) => <textarea maxLength="1024" {...input} required/>
        }
      </Field>
      <label>{label}</label>
    </div>
  );
};

export default OrderCreatingTextarea;