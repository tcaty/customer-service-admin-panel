import React, { Fragment } from 'react';

import Header from '../header';
import OrderCreating from '../order-creating';

const OrderCreatingPage = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <OrderCreating />
      </main>
    </Fragment>
  );
};

export default OrderCreatingPage;