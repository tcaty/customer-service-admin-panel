import React, { useCallback } from 'react';

import OrderListHeader from '../order-list-header';
import OrderListItem from '../order-list-item';

import './order-list.css';

const OrderList = ({ orders }) => {
  
  const getRenderedOrders = useCallback(() => {
    return orders.map((order, index) => <OrderListItem key={index} order={order}/>);
  }, [orders]);

  return (
    <div className="order-list">
      <div className="order-list__header">
        <OrderListHeader />
      </div>
      <div className="order-list__body">
        {getRenderedOrders()}
      </div>
    </div>
  );
};

export default OrderList;