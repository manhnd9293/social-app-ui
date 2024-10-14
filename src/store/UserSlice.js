import {createSlice} from "@reduxjs/toolkit";

const defaultUser = {_id: null, username: '', unseenNotifications: 0, unseenInvitations: 0, unreadMessages: 0};

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

    updateAvatar(state, action) {
      const { avatar } = action.payload;
      return {...state, avatar}
    },

    seenFriendRequest(state, action){
      const {unseenInvitations} = action.payload;
      state.unseenInvitations = unseenInvitations;
      return state;
    },

    updateUnseenRequest(state, action) {
      const {unseen} = {...action.payload};
      state.unseenInvitations = unseen;
    },

    updateSeenNotifications(state, action) {
      const {unseen: updateUnseen} = {...action.payload};
      state.unseenNotifications = updateUnseen;
      return state;
    },

    changeUnReadMessageBy(state, action) {
      const changeNumber = action.payload;
      state.unreadMessages = Math.max(state.unreadMessages + changeNumber, 0);

      return state;
    },

    updateUnReadMessage(state, action) {
      const {totalUnseen} = action.payload;
      state.unreadMessages = totalUnseen;
      return state;
    }

  }
})

export const userActions = userSlice.actions;

export default userSlice;