import {createSlice} from "@reduxjs/toolkit";

const defaultUser = {_id: null, username: ''};

const userSlice = createSlice({
  name: 'user',
  initialState: defaultUser,
  reducers: {
    fetchData(state, action){
      return action.payload;
    },
    login(state, action) {
      const currentUser = action.payload;
      const accessToken = currentUser.accessToken;
      localStorage.setItem("accessToken", accessToken);
      return {...state, ...currentUser};
    },
    logout(state) {
      localStorage.setItem("accessToken", "");
      return defaultUser;
    },
  }
})

export const userActions = userSlice.actions;

export default userSlice;