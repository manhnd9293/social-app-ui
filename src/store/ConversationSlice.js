import {createSlice} from "@reduxjs/toolkit";

const defaultConversationData = {
  unreadMessagesDetail: {}
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState: defaultConversationData,
  reducers: {

    setUnreadMessageDetail(state, action) {
      const {unreadMessagesDetail} = action.payload;
      state.unreadMessagesDetail = unreadMessagesDetail;
      return state;
    },

    updateUnreadMessageDetail(state, action) {
      const {conversationId, count} = action.payload;
      state.unreadMessagesDetail[conversationId] = count;
      return state;
    }

  }
})

export const conversationActions = conversationSlice.actions;

export default conversationSlice;