import updateSearchPanel from "../reducers/search-panel";
import { SEARCH_VALUE_CHANGED } from '../actions/action-names';

describe('updateSearchPanel', () => {

  it('should correctly change search value', () => {

    const state = {
      searchPanel: {
        searchValue: 'hello'
      }
    };

    const action = {
      type: SEARCH_VALUE_CHANGED,
      payload: 'goodbye'
    };

    const expectedSearchPanel = {
      searchValue: action.payload
    };

    expect(updateSearchPanel(state, action)).toEqual(expectedSearchPanel);
  })

  it('should return unchaged search panel when it does not know received action type', () => {

    const state = {
      searchPanel: {
        searchValue: 'search'
      }
    };

    const action = {
      type: 'FAILURE'
    };

    expect(updateSearchPanel(state, action)).toEqual(state.searchPanel);
  })
})
