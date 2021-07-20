import { SEARCH_VALUE_CHANGED } from "../actions/action-names";

const initialState = {
  searchValue: ''
};

const updateSearchPanel = (state, action) => {

  if (state === undefined) {
    return initialState;
  };
  
  switch (action.type) {
    
    case SEARCH_VALUE_CHANGED:
      return {
        searchValue: action.payload
      };

    default:
      return state.searchPanel;
  }
}

export default updateSearchPanel;