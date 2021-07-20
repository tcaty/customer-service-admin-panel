import updatePaginator from "./paginator";
import updateOrderList from "./order-list";
import updateSearchPanel from "./search-panel";

const reducer = (state, action) => {
  return {
    paginator: updatePaginator(state, action),
    orderList: updateOrderList(state, action),
    searchPanel: updateSearchPanel(state, action)
  }
};

export default reducer;