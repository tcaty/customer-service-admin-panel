import React, { useCallback } from 'react';
import { Form } from 'react-final-form';

import OrderCreatingInputFields from '../order-creating-input-fields';
import { withDDPlanetService } from '../hoc';

import './order-creating.css';

const OrderCreating = ({ ddPlanetService }) => {

  const handleSubmit = useCallback(formObj => {
    ddPlanetService.createOrder(formObj)
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }, [ddPlanetService]);

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

export default withDDPlanetService(OrderCreating);