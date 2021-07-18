import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import DDPlanetService from './services';
import { DDPlanetServiceProvider } from './components/ddplanet-service-context';
import ErrorBoundry from './components/error-boundry';
import store from './store';

import './index.css';

const ddPlanetService = new DDPlanetService();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundry>
        <DDPlanetServiceProvider value={ddPlanetService}>
          <Router>
            <App />
          </Router>
        </DDPlanetServiceProvider>
      </ErrorBoundry>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
