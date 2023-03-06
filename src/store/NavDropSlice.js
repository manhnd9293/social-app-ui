import {createSlice} from "@reduxjs/toolkit";

const defaultValues = {
  profile: false
}

const navDropSlice = createSlice({
  name: 'navbar-dropdown',
  initialState: defaultValues,
  reducers: {
    hideDropdown(state) {
      state.profile = false;
    },

    showDropdown(state) {
      state.profile = true;
    }
  }
})

export const navDropDownActions = navDropSlice.actions;
export default navDropSlice;