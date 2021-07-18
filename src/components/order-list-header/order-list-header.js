import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

import './order-list-header.css';

const OrderListHeader = () => {
  return (
    <div className="order-list-header">
      <div className="order-list-header__first-name">Имя</div>
      <div className="order-list-header__last-name last-name">
        <span className="last-name__icon"><AiOutlineArrowUp /></span>
        <span className="last-name__text">Фамилия</span>
      </div>
      <div className="order-list-header__middle-name">Отчество</div>
      <div className="order-list-header__user-phone">Номер</div>
      <div className="order-list-header__text">Текст обращения</div>
    </div>
  );
};

export default OrderListHeader;