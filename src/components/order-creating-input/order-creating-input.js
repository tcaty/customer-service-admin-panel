import React, { useCallback } from 'react';
import { Field } from 'react-final-form';

import './order-creating-input.css';

const OrderCreatingInput = ({ label, name, required, userPhone }) => {

  const getRenderedInput = useCallback((input, userPhone) => {
    if (userPhone) {
      return <input {...input} required pattern="\+\d{11}"/>;
    }
    return <input {...input} required={name === "middleName" ? required : true}/>;
  }, [name, required]);

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