const SocketEvent = {
  JoinRoom: 'join-room',
  FriendRequest: 'friend-request',
  Auth: 'authentication',
}

const FriendRequestState = {
  Pending: 'pending',
  Accepted: 'accepted',
  Decline: 'declined'
}


export {SocketEvent, FriendRequestState};