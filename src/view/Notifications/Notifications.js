import React, {useEffect, useState} from 'react';
import {beClient} from "../../config/BeClient";
import {useQuery} from "react-query";
import utils from "../../utils/utils";
import {useDispatch} from "react-redux";
import {userActions} from "../../store/UserSlice";
import {NotificationType} from "../../utils/Constant";

function loadNotifications({queryKey}) {
  const [_, page] = queryKey;
  return beClient.get(`/notifications?page=${page}`).then(res => res.data);
}

function Notifications() {
  const [page, setPage] = useState(0);
  const {data: notifications, isLoading, isError, error} = useQuery(['notifications', page], loadNotifications);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notifications) {
      beClient.patch('/notifications/seen', {
        notificationIds: notifications.map(notification => notification._id)
      }).then(res => {
        const updateUnseen = res.data;
        dispatch(userActions.updateSeenNotifications({updateUnseen}));
      })

    }
  }, [notifications]);

  return (
    <div>
      <div className={`subtitle mt-3`}>Notifications</div>
      {notifications && <div className={`list has-hoverable-list-items has-overflow-ellipsi has-background-white block`} style={{maxWidth: 600}}>
        {notifications.map(n =>
          <div className={`list-item is-clickable is-hoverable`} key={n._id} style={!n.seen ? {backgroundColor: '#d6e1ee'} : {}}>
            <article className={`media`}>
              <figure className={`media-left is-64x64 image`}>
                <img className={`is-rounded`} src={n.from.avatar || utils.defaultAvatar} style={{width: 64, height: 64}}/>
              </figure>
              <div className={`media-content`}>
                <strong>{n.from.fullName}</strong> {getNotificationMessage(n)}
              </div>
            </article>
          </div>
        )}
      </div>}
    </div>
  );
}

function getNotificationMessage(notification) {

  let message = '';
  switch (notification.type) {
    case NotificationType.Reaction:
      message = `reacted ${notification.payload.reaction} your ${notification.payload.media}`;
      break;
    case NotificationType.FriendAccept:
      message = `accepted your friend request. You now can send direct private messages to each others`;
      break;
    case NotificationType.Comment:
      message = `commented on your post`;
      break;
  }

  return message;
}

export default Notifications;