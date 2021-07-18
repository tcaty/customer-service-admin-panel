import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withDDPlanetService } from '../hoc';

import OrderDetails from '../order-details';
import ErrorMessage from '../error-message';
import LoadingIcon from '../loading-icon';
import { fetchOrder } from '../../actions';
import { compose } from '../../utils';

class OrderDetailsContainer extends Component {

  componentDidMount() {
    const { fetchOrder, orderId } = this.props;
    fetchOrder(orderId);   
  }

  render() {
    const { order, loading, error } = this.props;

    if (loading) {
      return <LoadingIcon />;
    }

    if (error) {
      return <ErrorMessage />;
    }

    return <OrderDetails order={order}/>;
  }
}

const mapStateToProps = ({ orderList: { orders, loading, error } }) => {
  return { order: orders[0], loading, error };
};

const mapDispatchToProps = (dispatch, { ddPlanetService }) => {
  return {
    fetchOrder: (orderId) => fetchOrder(dispatch, ddPlanetService)(orderId)
  };
};

export default compose (
  withDDPlanetService,
  connect(mapStateToProps, mapDispatchToProps)
)(OrderDetailsContainer);