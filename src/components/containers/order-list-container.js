import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import OrderList from '../order-list';
import { fetchOrders } from '../../actions';
import { withDDPlanetService } from '../hoc';
import ErrorMessage from '../error-message';
import LoadingIcon from '../loading-icon';
import { compose } from '../../utils';

const OrderListContainer = ({ fetchOrders, orders, loading, error }) => {

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return <LoadingIcon />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return <OrderList orders={orders}/>;
};

const mapStateToProps = ({ orderList: { orders, loading, error } }) => {
  return { orders, loading, error };
};

const mapDispatchToProps = (dispatch, { ddPlanetService }) => {
  return {
    fetchOrders: () => dispatch(fetchOrders(ddPlanetService))
  }
};

export default compose(
  withDDPlanetService,
  connect(mapStateToProps, mapDispatchToProps)
)(OrderListContainer);
