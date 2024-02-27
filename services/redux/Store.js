import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./reducers/RootReducer";

const middlewares = [thunk];
const Store = createStore(RootReducer, compose(applyMiddleware(...middlewares)))

export default Store