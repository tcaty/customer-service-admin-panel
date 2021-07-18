import React from 'react';
import { connect } from 'react-redux';

import './paginator-row-counter.css';

const PaginatorRowCounter = ({ total, firstRowNumber, lastRowNumber }) => {
  return (
    <div className="paginator-row-counter">
      <span className="paginator-row-counter__first-row-number">{firstRowNumber}</span>
      <span className="paginator-row-counter__sep">-</span>
      <span className="paginator-row-counter__last-row-number">{lastRowNumber}</span>
      <span className="paginator-row-counter__text">of</span>
      <span className="paginator-row-counter__total">{ total }</span>
    </div>
  );
};

const mapStateToProps = ({ orderList: { total }, paginator: { currentPageNumber, rowsPerPage } }) => {
  
  const firstRowNumber = rowsPerPage * (currentPageNumber - 1) + 1;
  const temp = firstRowNumber + rowsPerPage - 1;
  const lastRowNumber = temp > total ? total : temp;
  
  return { 
    total,
    firstRowNumber,
    lastRowNumber
   };
}

export default connect(mapStateToProps)(PaginatorRowCounter);