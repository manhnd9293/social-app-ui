import {combineReducers, createStore} from "redux";
import userReducer from "./user/UserReducer";
import {notificationReducer} from "./notification/NotificationReducer";


const allReducer = combineReducers(
    {
        user: userReducer,
        notification: notificationReducer
    }
);

const store = createStore(allReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;