import React, { useCallback } from 'react';
import { Form, Field } from 'react-final-form';

import './order-list-search-panel.css';

const OrderListSearchPanel = () => {

  const handleSubmit = useCallback(formObj => {
    console.log(formObj);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      {
        ({ handleSubmit }) => (
          <form className="order-list-search-panel" onSubmit={handleSubmit}>
            <Field name="orderListSearchPanel">
              {
                ({ input }) => (
                  <input type="text" placeholder="Имя, фамилия, отчество, номер..." {...input}/>
                )
              }
            </Field>
          </form>
        )
      }
    </Form>
  );
};

export default OrderListSearchPanel;