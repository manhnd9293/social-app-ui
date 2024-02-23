import {configureStore} from "@reduxjs/toolkit";
import notificationSlice from "./NotificationSlice";
import userSlice from "./UserSlice";
import navDropSlice from "./NavDropSlice";


const store = configureStore({
  reducer: {
    notification: notificationSlice.reducer,
    user: userSlice.reducer,
    navDropdown: navDropSlice.reducer,
  }
})


export default store;