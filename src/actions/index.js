import {
  ROWS_PER_PAGE_CHANGED,
  PAGE_SWITCHED,
  FETCH_ORDERS_REQUSTED,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
} from './action-names';

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

// Wrappers for action creators

const fetchOrder = (dispatch, ddPlanetService) => (orderId) => {
  dispatch(fetchOrdersRequested());
  ddPlanetService.getOrderById(orderId)
    .then(order => dispatch(fetchOrdersSuccess({ orders: [order] })))
    .catch(error => fetchOrdersFailure(error));
};

const fetchOrders = (ddPlanetService) => (dispatch, getState) => {
  dispatch(fetchOrdersRequested());

  const { paginator: { rowsPerPage, currentPageNumber } } = getState();
  const skip = rowsPerPage * (currentPageNumber - 1);
  const take = rowsPerPage;

  ddPlanetService.getAllOrders(skip, take)
    .then(({ orders, total }) => dispatch(fetchOrdersSuccess({ orders, total })))
    .catch(error => dispatch(fetchOrdersFailure(error)));
};

const withFetchOrders = (callback) => (callbackArg) => {
  return (ddPlanetService) => (dispatch, getState) => {
    dispatch(callback(callbackArg));
    fetchOrders(ddPlanetService)(dispatch, getState);
  }
};

const changeRowsPerPage = withFetchOrders(rowsPerPageChanged);
const switchPage = withFetchOrders(pageSwitched);

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
};