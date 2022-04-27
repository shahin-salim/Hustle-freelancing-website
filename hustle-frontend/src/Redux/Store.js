import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./Reducer/Index";
import thunk from 'redux-thunk'
// import { composeWithDevTools } from "redux-devtools-extension";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const isUserActive = localStorage.getItem('refreshToken') ? true : false

const initialState = {
    userStatus: isUserActive,
}

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;