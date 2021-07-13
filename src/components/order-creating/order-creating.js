import React, { useCallback } from 'react';
import { Form } from 'react-final-form';

import OrderCreatingInputFields from '../order-creating-input-fields';

import './order-creating.css';

const OrderCreating = () => {

  const handleSubmit = useCallback((formObj) => {
    console.log('ORDER CREATED!');
    console.log(formObj);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      {
        ({ handleSubmit, values: { withoutMiddleName } }) => (
          <form className="order-creating" onSubmit={handleSubmit}>
            <div className="order-creating__input-fields">
              <OrderCreatingInputFields withoutMiddleName={withoutMiddleName}/>
            </div> 
            <div className="order-creating__btn">
              <button type="submit">Создать обращение</button>
            </div>
          </form>
        )
      }
    </Form>
  );
};

export default OrderCreating;