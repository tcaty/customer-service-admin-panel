import React, { useCallback } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { RiCloseFill } from 'react-icons/ri';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteOrder } from '../../actions';
import { withDDPlanetService } from '../hoc';
import { compose } from '../../utils';

import './modal-delete-window.css';

const ModalDeleteWindow = ({ hideModal, orderId, deleteOrder }) => {

  const onSubmit = useCallback((orderId) => {
    deleteOrder(orderId);
    hideModal();
  }, [hideModal, deleteOrder]);

  return (
    <div className="modal-delete-window" onClick={hideModal}>
      <div className="modal-delete-window__content" onClick={e => e.stopPropagation()}>
        <div className="modal-delete-window__modal-header modal-header">
          <div className="modal-header__icon"><MdErrorOutline /></div>
          <div className="modal-header__text">
            Вы действительно хотите удалить обращение
          </div>
          <div className="modal-header__order-id">№{orderId}</div>
          <button className="modal-header__cancel-btn" onClick={hideModal}>
            <RiCloseFill />
          </button>
        </div>
        <div className="modal-delete-window__modal-body modal-body">
          <Link to="/order-list/">
            <button className="modal-body__submit-btn" onClick={() => onSubmit(orderId)}>
              Да
            </button>
          </Link>
          <button className="modal-body__cancel-btn" onClick={hideModal}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { ddPlanetService }) => {
  return {
    deleteOrder: (orderId) => dispatch(deleteOrder(ddPlanetService)(orderId))
  };
};

export default compose(
  withDDPlanetService,
  connect(null, mapDispatchToProps)
)(ModalDeleteWindow);