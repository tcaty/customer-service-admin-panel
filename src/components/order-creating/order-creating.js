import React, { useState } from 'react';

import OrderCreatingInput from '../order-creating-input';
import OrderCreatingCheckbox from '../order-creating-checkbox';
import OrderCreatingTextarea from '../order-creating-textarea';

import './order-creating.css';

const OrderCreating = () => {
  
  const [order, setOrder] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    withoutMiddleName: false,
    userPhone: '',
    text: ''
  });

  const setOrderField = (fieldName) => (value) => {
    const { ...state } = order;
    state[fieldName] = value;
    setOrder(state);
  };

  const handleSubmit = (event) => {
    console.log('ORDER CREATED');
    console.log(order);
    event.preventDefault();
  };
  
  return (
    <form className="order-creating" onSubmit={handleSubmit}>
      <OrderCreatingInput 
        label={"Имя"} 
        onChange={setOrderField("firstName")}/>

      <OrderCreatingInput 
        label={"Фамилия"} 
        onChange={setOrderField("lastName")}/>

      <OrderCreatingInput 
        label={"Отчество"} 
        onChange={setOrderField("middleName")} 
        required={!order.withoutMiddleName}/>

      <OrderCreatingCheckbox onChange={setOrderField("withoutMiddleName")}/>

      <OrderCreatingInput 
        label={"Номер телефона"} 
        onChange={setOrderField("userPhone")} 
        userPhone={true}/>

      <OrderCreatingTextarea 
        label={"Текст обращения"} 
        onChange={setOrderField("text")}/>
        
      <div className="order-creating__btn">
        <button type="submit">Создать обращение</button>
      </div>
    </form>
  );
};

export default OrderCreating;