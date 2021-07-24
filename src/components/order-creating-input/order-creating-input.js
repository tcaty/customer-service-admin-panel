import React, { useCallback } from 'react';
import { Field } from 'react-final-form';

import './order-creating-input.css';

const OrderCreatingInput = ({ label, name, withoutMiddleName, userPhone }) => {

  const getRenderedInput = useCallback((input, userPhone) => {
    if (userPhone) {
      return <input {...input} required pattern="\+\d{11}"/>;
    }
    return (
      <input 
        {...input} 
        disabled={name === "middleName" ? withoutMiddleName : false}
        required={name === "middleName" ? !withoutMiddleName : true}/>
    );
  }, [name, withoutMiddleName]);

  return (
    <div className="order-creating-input">
      <Field name={name} type="text">
        {
          ({ input }) => getRenderedInput(input, userPhone)
        }
      </Field>
      <label>{label}</label>
    </div>
  );
};

export default OrderCreatingInput;