import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./src/mainapp/redux_services/reducers";

const initalState = {};
const middleware = [thunk];

let store;

store = createStore(
  rootReducer,
  initalState,
  compose(applyMiddleware(...middleware))
);

export default store;
