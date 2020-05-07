import { createStore, combineReducers, applyMiddleware } from "redux";
import modal from "../_reducers/modal";
import {
  promise,
  searchFilter,
  processSign,
  checkDataSign,
} from "../_middlewares";
import { houses, house } from "../_reducers/house";
import filter from "../_reducers/filter";
import { sign, dataSign, profile, password } from "../_reducers/user";
import { transactions, transaction } from "../_reducers/transaction";
import { cities } from "../_reducers/city";

const reducers = combineReducers({
  cities,
  modal,
  houses,
  house,
  filter,
  sign,
  dataSign,
  profile,
  password,
  transactions,
  transaction,
});
const middleware = [promise, searchFilter, processSign, checkDataSign];

const store = createStore(reducers, applyMiddleware(...middleware));

export default store;
