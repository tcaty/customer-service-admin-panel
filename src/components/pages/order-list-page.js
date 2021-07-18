import React, { Fragment } from 'react';

import Header from '../header';
import OrderListSearchPanel from '../order-list-search-panel';
import { OrderListContainer } from '../containers';
import Paginator from '../paginator';

const OrderListPage = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <OrderListSearchPanel />
        <OrderListContainer />
        <Paginator />
      </main>
    </Fragment>
  );
};

export default OrderListPage;