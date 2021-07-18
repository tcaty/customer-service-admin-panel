import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { connect } from 'react-redux';

import { switchPage } from '../../actions';
import { withDDPlanetService } from '../hoc';
import { compose } from '../../utils';

import './paginator-page-switch.css';

const PaginatorPageSwitch = ({ currentPageNumber, switchPageToPrev, switchPageToNext, maxPageNumber, loading }) => {
  return (
    <div className="paginator-page-switch">
      <button
        onClick={currentPageNumber === 1 || loading ? () => {} : switchPageToPrev} 
        className="paginator-page-switch__to-prev-page-btn">
        <RiArrowLeftSLine />
      </button>
      <div className="paginator-page-switch__current-page-number">
        {currentPageNumber}
      </div>
      <button
        onClick={currentPageNumber === maxPageNumber || loading ? () => {} : switchPageToNext}
        className="paginator-page-switch__to-next-page-btn">
        <RiArrowRightSLine />
      </button>
    </div>
  );
};

const mapStateToProps = ({ paginator: { currentPageNumber, maxPageNumber }, orderList: { loading } }) => {
  return { currentPageNumber, maxPageNumber, loading };
};

const mapDispatchToProps = (dispatch, { ddPlanetService }) => {
  return {
    switchPageToPrev: () => dispatch(switchPage(-1)(ddPlanetService)),
    switchPageToNext: () => dispatch(switchPage(1)(ddPlanetService))
  };
};

export default compose(
  withDDPlanetService,
  connect(mapStateToProps, mapDispatchToProps)
)(PaginatorPageSwitch)