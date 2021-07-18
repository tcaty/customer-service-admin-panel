import React from 'react';
import { Route } from 'react-router-dom';

import { OrderCreatingPage, OrderListPage, OrderDetailsPage } from '../pages';

import './app.css';

const App = () => {
  return (
    <div className="app">
      <Route path="/" component={OrderCreatingPage} exact /> 
      <Route path="/order-list" component={OrderListPage} />
      <Route path="/order-details/:orderId" component={OrderDetailsPage}/>
    </div>
  );
};

export default App;