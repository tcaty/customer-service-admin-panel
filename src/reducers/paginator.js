import {
  ROWS_PER_PAGE_CHANGED,
  PAGE_SWITCHED,
  MAX_PAGE_NUMBER_CHANGED,
  PAGE_SWITCHED_TO_FIRST
} from '../actions/action-names';

const initialPaginator = {
  maxRowsPerPage: 7,
  rowsPerPage: 7,
  maxPageNumber: null,
  currentPageNumber: 1,
};

const updateMaxPageNumber = ({ orderList: { total }}, rowsPerPage) => {
  const newMaxPageNumber = Math.ceil(total / rowsPerPage);
  return newMaxPageNumber === 0 ? 1 : newMaxPageNumber;
};

const updateCurrentPageNumber = ({ paginator: { currentPageNumber } }, shift) => {
  return currentPageNumber + shift;
};

const updatePaginator = (state, action) => {

  if (state === undefined) {
    return initialPaginator;
  }
  
  switch (action.type) {

    case ROWS_PER_PAGE_CHANGED:
      return {
        ...state.paginator,
        rowsPerPage: action.payload,
        maxPageNumber: updateMaxPageNumber(state, action.payload)
      };

    case PAGE_SWITCHED:
      return {
        ...state.paginator,
        maxPageNumber: updateMaxPageNumber(state, state.paginator.rowsPerPage),
        currentPageNumber: updateCurrentPageNumber(state, action.payload)
      };

    case MAX_PAGE_NUMBER_CHANGED:
      return {
        ...state.paginator,
        maxPageNumber: action.payload
      }

    case PAGE_SWITCHED_TO_FIRST:
      return {
        ...state.paginator,
        currentPageNumber: 1
      }

    default:
      return state.paginator;
  }
};

export default updatePaginator;