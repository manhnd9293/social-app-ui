import {createSlice} from "@reduxjs/toolkit";

const topLevelClickEventHandlers = createSlice({
  name: 'topLevelCLickEvents',
  initialState: [],
  reducers: {
    addHandler(state, action) {
      state.push(action.payload);
    },

    removeHandler(state, action) {
      state = state.filter(s => s !== action.payload);
    }

  }
})
export const topLevelClickAction = topLevelClickEventHandlers.actions;
export default topLevelClickEventHandlers;