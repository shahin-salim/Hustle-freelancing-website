import { combineReducers } from "redux";
import { setUserStatusReducer } from "./tokenReducer"
import { setServiceReducer } from "./servicesReducer";

export const reducer = combineReducers({
    userStatus: setUserStatusReducer,
    services: setServiceReducer
})