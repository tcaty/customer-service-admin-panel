import updateOrderList from "../reducers/order-list";

import { 
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_REQUSTED,
  FETCH_ORDERS_SUCCESS
} from '../actions/action-names';

describe('updateOrderList', () => {

  it('should start loading after order list has orders/error', () => {

    const state = {
      orderList: {
        orders: [1, 2],
        loading: true,
        error: 'error',
        total: 0,
      }
    };

    const action = {
      type: FETCH_ORDERS_REQUSTED
    };

    const expectedOrderList = {
      ...state.orderList,
      loading: true,
      orders: [],
      error: null
    };

    expect(updateOrderList(state, action)).toEqual(expectedOrderList);
  })

  it('should stop loading, has orders, has total, has not error when fetch success', () => {

    const state = {
      orderList: {
        orders: [],
        loading: true,
        error: null,
        total: 0
      }
    };

    const action = {
      type: FETCH_ORDERS_SUCCESS,
      payload: {
        orders: [1, 2, 3],
        total: 3
      }
    };

    const expectedOrderList = {
      orders: action.payload.orders,
      loading: false,
      error: null,
      total: action.payload.total
    };

    expect(updateOrderList(state, action)).toEqual(expectedOrderList);
  })

  it('should stop loading, has not orders, has not total, has error when fetch failure', () => {

    const state = {
      orderList: {
        orders: [],
        loading: true,
        error: null,
        total: 0
      }
    };

    const action = {
      type: FETCH_ORDERS_FAILURE,
      payload: 'error: something goes wrong'
    };

    const expectedOrderList = {
      orders: [],
      loading: false,
      error: action.payload,
      total: 0
    };

    expect(updateOrderList(state, action)).toEqual(expectedOrderList);
  })

  it('should return unchaged order list when it does not know received action type', () => {

    const state = {
      orderList: {
        orders: [1, 2, 3, 5, 9],
        loading: false,
        error: null,
        total: 5
      }
    };

    const action = {
      type: 'HELLO_WORLD'
    };

    expect(updateOrderList(state, action)).toEqual(state.orderList);
  })
})