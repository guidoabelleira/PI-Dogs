import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducer from "../reducer/index";

const store = createStore(reducer, applyMiddleware(reduxThunk));

export default store;