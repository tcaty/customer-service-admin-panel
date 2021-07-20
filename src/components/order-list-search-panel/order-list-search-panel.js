import React, { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';

import { changeSearchValue } from '../../actions';
import { withDDPlanetService } from '../hoc';
import { compose } from '../../utils';  

import './order-list-search-panel.css';

const OrderListSearchPanel = ({ changeSearchValue }) => {

  const handleSubmit = useCallback(({ searchValue = '' }) => {
    changeSearchValue(searchValue);
  }, [changeSearchValue]);

  return (
    <Form onSubmit={handleSubmit}>
      {
        ({ handleSubmit }) => (
          <form className="order-list-search-panel" onSubmit={handleSubmit}>
            <Field name="searchValue">
              {
                ({ input }) => (
                  <input type="text" placeholder="Имя, фамилия, отчество, номер..." {...input}/>
                )
              }
            </Field>
          </form>
        )
      }
    </Form>
  );
};

const mapDispatchToProps = (dispatch, { ddPlanetService }) => {
  return {
    changeSearchValue: (value) => dispatch(changeSearchValue(value)(ddPlanetService))
  }
};

export default compose(
  withDDPlanetService,
  connect(null, mapDispatchToProps)
)(OrderListSearchPanel);