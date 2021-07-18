import React from 'react';

import './order-details-header.css';

const OrderDetailsHeader = ({ orderId }) => {
  return (
    <header className="order-details-header">
      <div className="order-details-header__order-number order-number">
        <span className="order-number__text">Обращение</span>
        <span className="order-number__number">№{orderId}</span>
      </div>
    </header>
  );
};

export default OrderDetailsHeader;