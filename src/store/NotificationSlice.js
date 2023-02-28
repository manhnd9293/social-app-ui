import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers : {
    add: (state, action) => {
      return action.payload;
    },
    remove: (state) => {
      return null
    }
  }
})
export const notificationActions = notificationSlice.actions;
export default notificationSlice;