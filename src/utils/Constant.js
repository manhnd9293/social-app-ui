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
  Decline: 'declined',
  Cancel: 'canceled'
}

const OnlineState = {
  Online: 'online',
  Offline: 'offline'
}
const Reaction = {
  Like: 'like',
  Love: 'love',
  Angry: 'angry',
  Haha: 'haha',
  Sad: 'sad',
  Wow: 'wow',
  Care: 'care'
}

const Media = {
  Post: 'post',
  Photo: 'photo',
  Comment: 'comment'
}


export {SocketEvent, FriendRequestState, OnlineState, Reaction, Media};