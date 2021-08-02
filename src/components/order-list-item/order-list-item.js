import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { withModalDeleteWindow } from '../hoc';
import ModalDeleteWindow from '../modal-delete-window';

import './order-list-item.css';

const OrderListItem = (
    { order: { orderId, firstName, lastName, middleName, text, userPhone }, isModalVisible, showModal, hideModal }
  ) => {

  return (
    <div className="order-list-item">
      <button onClick={showModal} className="order-list-item__delete-order-btn">
        <FaTrash />
      </button>
      <Link to={`/order-details/${orderId}`}>
        <div className="order-list-item__first-name">{firstName}</div>
        <div className="order-list-item__last-name">{lastName}</div>
        <div className="order-list-item__middle-name">{middleName}</div>
        <div className="order-list-item__user-phone">{userPhone}</div>
        <div className="order-list-item__text-container">
          <div className="order-list-item__text">{text}</div>
        </div>
      </Link>
      {isModalVisible && <ModalDeleteWindow hideModal={hideModal} orderId={orderId}/>}
    </div>
  );
};

export default withModalDeleteWindow(OrderListItem);