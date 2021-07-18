import React, { useCallback } from 'react';
import { Form, Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';
import { connect } from 'react-redux';

import { changeRowsPerPage } from '../../actions';
import { withDDPlanetService } from '../hoc';
import { compose } from '../../utils';

import './paginator-rows-per-page.css';

const PaginatorRowsPerPage = ({ maxRowsPerPage, changeRowsPerPage }) => {

  const handleSubmit = useCallback(({ rowsPerPage }) => {
    changeRowsPerPage(Number(rowsPerPage));
  }, [changeRowsPerPage]);
  
  const getRenderedOptions = useCallback(() => {
    return [...Array(maxRowsPerPage)].map((item, index) => {
      const increasedIndex = ++index;
      return <option value={increasedIndex} key={increasedIndex}>{increasedIndex}</option>;
    })
  }, [maxRowsPerPage]);

  return (
    <Form onSubmit={handleSubmit}>
      {
        ({ handleSubmit }) => (
          <form className="paginator-rows-per-page" onSubmit={handleSubmit}>
            <label>Rows per page:</label>
            <Field name="rowsPerPage" component="select" defaultValue={maxRowsPerPage}>
              {getRenderedOptions()}
            </Field>
            <OnChange name="rowsPerPage">
              {value => handleSubmit(value)}
            </OnChange>
          </form>
        )
      }
    </Form>
  );
};

const mapStateToProps = ({ paginator: { maxRowsPerPage } }) => {
  return { maxRowsPerPage };
}

const mapDispatchToProps = (dispatch, { ddPlanetService }) => {
  return {
    changeRowsPerPage: (newRowsPerPage) => dispatch(changeRowsPerPage(newRowsPerPage)(ddPlanetService))
  }
}

export default compose(
  withDDPlanetService,
  connect(mapStateToProps, mapDispatchToProps)
)(PaginatorRowsPerPage);