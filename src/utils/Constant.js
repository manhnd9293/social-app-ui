const SocketEvent = {
  JoinRoom: 'join-room',
  Auth: 'authentication',
  MessageSent: 'message-sent',
  MessageReceived: 'message-receive',
  SentMessageFail: 'error-sent-message',
  NewConversation: 'new-conversation',
  AcceptRequest: 'accept-request',
  Typing: 'typing',
  EndTyping: 'end-typing',
  UpdateOnlineState: 'update-online-state',
  FriendRequest: 'friend-request',
  Notification: 'notification',
  SeenMessage: 'seen-message'
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

const Relation = {
  Friend: 'friend',
  Stranger: 'stranger',
  SentRequest: 'sent-request',
  ReceiveRequest: 'receive-request',
  Me: 'me'
}

const NotificationType = {
  Reaction: 'reaction',
  FriendAccept: 'friend-accept',
  Comment: 'comment'
}

const ListReaction = [
  {
    label: '👍',
    value: 'like'
  },
  {
    label: '❤️',
    value: 'love'
  },
  {
    label: '😄',
    value: 'haha'
  },
  {
    label: '😯',
    value: 'wow'
  },
  {
    label: '😡',
    value: 'angry'
  },
  {
    label: '😢',
    value: 'sad'
  }
]

const MutationAction = {
  Create: 'create',
  Update: 'update',
  Push: 'push',
  Pull: 'pull',
  Delete: 'delete'
}

export {SocketEvent, FriendRequestState, OnlineState, Reaction, Media, Relation, NotificationType, ListReaction, MutationAction};