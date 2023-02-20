const NotiActionType = Object.freeze({
    Add: 'AddNoti',
    Remove: 'RemoveNoti',
})

const notificationReducer = (state = [], action) => {
    let notificationPayload = action.payload;
    switch (action.type) {
        case NotiActionType.Add:
            return [...state, notificationPayload]
        case NotiActionType.Remove:
             let updateNotiState = state.filter(notification => notification.id !== notificationPayload.id);
             return updateNotiState
        default:
            return state
    }
}

const NotificationAction = {
    add: (notification) => {
        return {
            type: NotiActionType.Add,
            payload: notification
        }
    },

    remove: (notification) => {
        return {
            type: NotiActionType.Remove,
            payload: notification
        }
    },

}

export {NotiActionType, notificationReducer, NotificationAction}