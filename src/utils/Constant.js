const SocketEvent = {
  JoinRoom: 'join-room',
  FriendRequest: 'friend-request',
  Auth: 'authentication',
  MessageSent: 'message-sent',
  MessageReceived: 'message-receive',
  SentMessageFail: 'error-sent-message',
  NewConversation: 'new-conversation',
  AcceptRequest: 'accept-request',
  Typing: 'typing',
  EndTyping: 'end-typing',
  UpdateOnlineState: 'update-online-state'
}

const FriendRequestState = {
  Pending: 'pending',
  Accepted: 'accepted',
  Decline: 'declined'
}

const OnlineState = {
  Online: 'online',
  Offline: 'offline'
}



export {SocketEvent, FriendRequestState, OnlineState};