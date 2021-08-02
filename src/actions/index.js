import {
  ROWS_PER_PAGE_CHANGED,
  PAGE_SWITCHED,
  FETCH_ORDERS_REQUSTED,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  SEARCH_VALUE_CHANGED,
  MAX_PAGE_NUMBER_CHANGED,
  PAGE_SWITCHED_TO_FIRST
} from './action-names';

import { filterObjArrayBySubstr } from '../utils';

// Action creators

const rowsPerPageChanged = (payload) => {
  return {
    type: ROWS_PER_PAGE_CHANGED,
    payload
  }
};

const pageSwitched = (payload) => {
  return {
    type: PAGE_SWITCHED,
    payload
  };
};

const fetchOrdersRequested = () => {
  return {
    type: FETCH_ORDERS_REQUSTED
  }
};

const fetchOrdersSuccess = (payload) => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    payload
  }
};

const fetchOrdersFailure = (payload) => {
  return {
    type: FETCH_ORDERS_FAILURE,
    payload
  }
};

const searchValueChanged = (payload) => {
  return {
    type: SEARCH_VALUE_CHANGED,
    payload
  }
};

const maxPageNumberChanged = (payload) => {
  return {
    type: MAX_PAGE_NUMBER_CHANGED,
    payload
  }
};

const pageSwitchedToFirst = () => {
  return {
    type: PAGE_SWITCHED_TO_FIRST
  }
}

// Wrappers for action creators 

const fetchOrder = (dispatch, ddPlanetService) => (orderId) => {
  dispatch(fetchOrdersRequested());
  ddPlanetService.getOrderById(orderId)
    .then(order => dispatch(fetchOrdersSuccess({ orders: [order] })))
    .catch(error => fetchOrdersFailure(error));
};

const changeMaxPageNumber = (total, rowsPerPage, dispatch) => {
  const temp = Math.ceil(total / rowsPerPage);
  const newMaxPageNumber = temp === 0 ? 1 : temp
  dispatch(maxPageNumberChanged(newMaxPageNumber));
  return newMaxPageNumber;
};

const fetchOrders = (ddPlanetService) => async (dispatch, getState) => {
  dispatch(fetchOrdersRequested());

  const { paginator: { rowsPerPage, currentPageNumber }, searchPanel: { searchValue } } = getState();
  let skip;
  let take;

  const { total } = await ddPlanetService.getAllOrders(0, 0);
  const { orders } = await ddPlanetService.getAllOrders(0, total);
  const filteredOrders = filterObjArrayBySubstr(orders, searchValue);

  const newMaxPageNumber = changeMaxPageNumber(filteredOrders.length, rowsPerPage, dispatch);

  if (currentPageNumber > newMaxPageNumber) {
    dispatch(pageSwitchedToFirst());
    skip = 0;
    take = rowsPerPage;
  }
  else {
    skip = rowsPerPage * (currentPageNumber - 1);
    take = skip + rowsPerPage;
  }

  dispatch(fetchOrdersSuccess({
    orders: filteredOrders.slice(skip, take),
    total: filteredOrders.length,
  }))
};

const withFetchOrders = (callback) => (callbackArg) => {
  return (ddPlanetService) => async (dispatch, getState) => {
    dispatch(callback(callbackArg));
    await fetchOrders(ddPlanetService)(dispatch, getState);
  }
};

const changeRowsPerPage = withFetchOrders(rowsPerPageChanged);
const switchPage = withFetchOrders(pageSwitched);
const changeSearchValue = withFetchOrders(searchValueChanged);

const deleteOrder = (ddPlanetService) => (orderId) => {
  return (dispatch, getState) => {
    ddPlanetService.deleteOrder(orderId)
      .catch(error => console.log(error));
    fetchOrders(ddPlanetService)(dispatch, getState);
  }
};

export {
  fetchOrder,
  fetchOrders,
  deleteOrder,
  changeRowsPerPage,
  switchPage,
  changeSearchValue
};
