import React from 'react';

import PaginatorRowsPerPage from '../paginator-rows-per-page';
import PaginatorRowCounter from '../paginator-row-counter';
import PaginatorPageSwitch from '../paginator-page-switch';

import './paginator.css';

const Paginator = () => {

  return (
    <div className="paginator">
      <PaginatorRowsPerPage />
      <PaginatorRowCounter />
      <PaginatorPageSwitch />
    </div>
  );
};

export default Paginator;