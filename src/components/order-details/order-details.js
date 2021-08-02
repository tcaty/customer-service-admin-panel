import React from 'react';
import { FaTrash } from 'react-icons/fa';

import OrderDetailsRow from '../order-details-row';
import { withModalDeleteWindow } from '../hoc';
import ModalDeleteWindow from '../modal-delete-window';

import './order-details.css';

const OrderDetails = (
    { order: { orderId, firstName, lastName, middleName, userPhone, text }, isModalVisible, showModal, hideModal }
  ) => {

  return (
    <div className="order-details">
      <div className="order-details__rows">
        <OrderDetailsRow fieldName={"Имя"} fieldValue={firstName}/>
        <OrderDetailsRow fieldName={"Фамилия"} fieldValue={lastName}/>
        <OrderDetailsRow fieldName={"Отчество"} fieldValue={middleName}/>
        <OrderDetailsRow fieldName={"Номер телефона"} fieldValue={userPhone}/>
        <OrderDetailsRow fieldName={"Текст обращения"} fieldValue={text}/>
      </div>
      <button className="order-details__delete-order-btn delete-order-btn" onClick={showModal}>
        <span className="delete-order-btn__text">Удалить</span>
        <span className="delete-order-btn__icon"><FaTrash /></span>
      </button>
      {isModalVisible && <ModalDeleteWindow hideModal={hideModal} orderId={orderId}/>}
    </div>
  );
};

export default withModalDeleteWindow(OrderDetails);