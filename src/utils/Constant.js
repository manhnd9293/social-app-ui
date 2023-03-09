const SocketEvent = {
  JoinRoom: 'join-room',
  FriendRequest: 'friend-request',
  Auth: 'authentication',
  MessageSent: 'message-sent',
  MessageReceived: 'message-receive',
  SentMessageFail: 'error-sent-message'
}

const FriendRequestState = {
  Pending: 'pending',
  Accepted: 'accepted',
  Decline: 'declined'
}


export {SocketEvent, FriendRequestState};