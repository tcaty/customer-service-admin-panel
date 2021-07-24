import {
  FETCH_ORDERS_REQUSTED,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
} from '../actions/action-names';

const initialOrderList = {
  orders: [],
  loading: true,
  error: null,
  total: 0,
};

const updateOrderList = (state, action) => {

  if (state === undefined) {
    return initialOrderList;
  }

  switch (action.type) {

    case FETCH_ORDERS_REQUSTED:
      return {
        ...state.orderList,
        orders: [],
        loading: true,
        error: null,
      };

    case FETCH_ORDERS_SUCCESS:
      return {
        orders: action.payload.orders,
        loading: false,
        error: null,
        total: action.payload.total
      };

    case FETCH_ORDERS_FAILURE:
      return {
        orders: [],
        loading: false,
        error: action.payload,
        total: 0
      };

    default:
      return state.orderList;
  }
};

export default updateOrderList;
