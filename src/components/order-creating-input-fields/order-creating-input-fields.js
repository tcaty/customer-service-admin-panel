import React, { Fragment } from 'react';

import OrderCreatingInput from '../order-creating-input';
import OrderCreatingCheckbox from '../order-creating-checkbox';
import OrderCreatingTextarea from '../order-creating-textarea';

const OrderCreatingInputFields = ({ withoutMiddleName }) => {
  return (
    <Fragment>
      <OrderCreatingInput label={"Имя"} name={"firstName"} />
      <OrderCreatingInput label={"Фамилия"} name={"lastName"}/>
      <OrderCreatingInput label={"Отчество"} name={"middleName"} withoutMiddleName={withoutMiddleName}/>
      <OrderCreatingCheckbox label={"Нет отчества"} name={"withoutMiddleName"}/>
      <OrderCreatingInput label={"Номер телефона"} name={"userPhone"} userPhone={true}/>
      <OrderCreatingTextarea label={"Текст обращения"} name={"text"}/>
    </Fragment>
  );
};

export default OrderCreatingInputFields;