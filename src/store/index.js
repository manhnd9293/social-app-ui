import {configureStore} from "@reduxjs/toolkit";
import notificationSlice from "./NotificationSlice";
import userSlice from "./UserSlice";
import topLevelClickEventHandlers from "./TopLevelClickEventSlice";


// const allReducer = combineReducers(
//     {
//         user: userReducer,
//         notification: notificationReducer
//     }
// );
//
// const store = createStore(allReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = configureStore({
  reducer: {
    notification: notificationSlice.reducer,
    user: userSlice.reducer,
    topLevelClickEventHandlers: topLevelClickEventHandlers.reducer,
  }
})


export default store;