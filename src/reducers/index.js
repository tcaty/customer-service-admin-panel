import updatePaginator from "./paginator";
import updateOrderList from "./order-list";

const reducer = (state, action) => {
  return {
    paginator: updatePaginator(state, action),
    orderList: updateOrderList(state, action)
  }
};

export default reducer;