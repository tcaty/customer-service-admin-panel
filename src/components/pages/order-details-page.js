import React, { Fragment } from 'react';

import OrderDetailsHeader from '../order-details-header';
import { OrderDetailsContainer } from '../containers';

const OrderDetailsPage = ({ match: { params: { orderId } } }) => {
  return (
    <Fragment>
      <OrderDetailsHeader orderId={orderId}/>
      <OrderDetailsContainer orderId={orderId}/>
    </Fragment>
  );
};

export default OrderDetailsPage;