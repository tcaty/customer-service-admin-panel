import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../header';
import { OrderCreatingPage } from '../pages';

import './app.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Route path="/" component={OrderCreatingPage} exact/>
    </div>
  );
};

export default App;