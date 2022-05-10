import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./Reducer/Index";
import thunk from 'redux-thunk'
import { decodeJwtToken } from "../Utils/decode.jwt";
// import { composeWithDevTools } from "redux-devtools-extension";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const initialState = {
    userStatus: decodeJwtToken(),
}

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;