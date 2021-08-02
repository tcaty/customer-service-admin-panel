import configureMockStore from 'redux-mock-store';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { render, unmountComponentAtNode  } from 'react-dom';
import { act } from "react-dom/test-utils";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import reducer from '../reducers'
import { fetchOrders, switchPage, changeSearchValue } from '../actions';
import DDPlanetService from '../services';
import { 
  FETCH_ORDERS_REQUSTED, 
  FETCH_ORDERS_SUCCESS, 
  MAX_PAGE_NUMBER_CHANGED,
 } from '../actions/action-names';
import { OrderListContainer } from '../components/containers';
import { DDPlanetServiceProvider } from '../components/ddplanet-service-context';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const ddPlanetService = new DDPlanetService();

const moсkedResponseForGetAllOrders = {
  orders: [
    { orderId: 11, firstName: 'dsa', lastName: 'dstt', middleName: '', userPhone: '+7 (914) 3091212', text: 'dsadsaodoa' },
    { orderId: 434, firstName: 'f', lastName: 'OK', middleName: 'da',  userPhone: '+7 (914) 3091212', text: 'dsadFDsaodoa' }
  ],
  total: 2
};

describe('Tests without render', () => {

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  //
  // when we are creating mocked store, it means that we need only actions, state is not intrested for us
  //

  it('it should fetch orders correctly', () => {
    
    fetchMock.get(/\/orders\/getAllOrders\/\d+\/\d+\//, moсkedResponseForGetAllOrders);

    const expectedActions = [
      { type: FETCH_ORDERS_REQUSTED },
      { type: MAX_PAGE_NUMBER_CHANGED, payload: 1 },
      {
        type: FETCH_ORDERS_SUCCESS, 
        payload: {
          orders: ddPlanetService._transformAllOrders(moсkedResponseForGetAllOrders.orders),
          total: moсkedResponseForGetAllOrders.total
        }
      }
    ];

    const state = {
      paginator: {
        rowsPerPage: 7,
        currentPageNumber: 1
      },
      searchPanel: {
        searchValue: ''
      },
    };
    
    const store = mockStore(state);

    fetchOrders(ddPlanetService)(store.dispatch, store.getState)  
      .then(() => expect(store.getActions()).toEqual(expectedActions))
      .catch(error => console.log(error));
  });

  it('it should request orders after page switched', () => {

    fetchMock.get(/\/orders\/getAllOrders\/\d+\/\d+\//, moсkedResponseForGetAllOrders);

    const state = {
      paginator: {
        rowsPerPage: 5,
        currentPageNumber: 4
      },
      searchPanel: {
        searchValue: ''
      },
    };

    const store = mockStore(state);

    switchPage(1)(ddPlanetService)(store.dispatch, store.getState)
      .then(() => expect(store.getActions()).toContainEqual({ type: FETCH_ORDERS_REQUSTED }))
      .catch(error => console.log(error));
  })

  it('it should request orders with the new filter after search value changed', () => {

    fetchMock.get(/\/orders\/getAllOrders\/\d+\/\d+\//, moсkedResponseForGetAllOrders);

    const newSearchValue = 'new search value';

    const expectedState = {
      paginator: {
        rowsPerPage: 3,
        currentPageNumber: 1,
        maxPageNumber: 1
      },
      searchPanel: {
        searchValue: newSearchValue
      },
      orderList: {
        orders: [],
        loading: false,
        error: null,
        total: 0
      }
    };

    const preloadedState = {
      paginator: {
        rowsPerPage: 3,
        currentPageNumber: 2
      },
      searchPanel: {
        searchValue: ''
      },
      orderList: {
        orders: [1, 2, 3],
        loading: false,
        error: null,
        total: 3
      }
    };

    const store = configureStore({
      reducer,
      preloadedState
    });

    changeSearchValue(newSearchValue)(ddPlanetService)(store.dispatch, store.getState)
      .then(() => expect(store.getState()).toEqual(expectedState))
      .catch(error => console.log(error));
  })
});

describe('Special tests with render', () => {

  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('OrderListContainer should fetch data while it rendering', async () => {
    
    fetchMock.get(/\/orders\/getAllOrders\/\d+\/\d+\//, moсkedResponseForGetAllOrders);

    const expectedState = {
      paginator: {
        rowsPerPage: 2,
        currentPageNumber: 1,
        maxPageNumber: 1
      },
      searchPanel: {
        searchValue: ''
      },
      orderList: {
        orders: ddPlanetService._transformAllOrders(moсkedResponseForGetAllOrders.orders),
        loading: false,
        error: null, 
        total: moсkedResponseForGetAllOrders.total,
      },
    }

    const preloadedState = {
      paginator: {
        rowsPerPage: 2,
        currentPageNumber: 1
      },
      searchPanel: {
        searchValue: ''
      },
      orderList: {
        orders: [],
        loading: true,
        error: null,
        total: 0
      }
    };

    const store = configureStore({
      reducer,
      preloadedState
    });

    await act(async () => { 
      render(
        <Provider store={store}>
          <DDPlanetServiceProvider value={ddPlanetService}>
            <Router>
              <OrderListContainer fetchOrders={fetchOrders} {...preloadedState.orderList}/>
            </Router>
          </DDPlanetServiceProvider>
        </Provider>,
        container
      );
    });

    expect(store.getState()).toEqual(expectedState);
  })
})