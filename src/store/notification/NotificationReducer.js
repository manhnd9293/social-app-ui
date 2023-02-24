const NotiActionType = Object.freeze({
  Add: 'AddNoti',
  Remove: 'RemoveNoti',
})

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case NotiActionType.Add:
      return action.payload;
    case NotiActionType.Remove:
      return null;
    default:
      return state
  }
}


export {NotiActionType, notificationReducer,}