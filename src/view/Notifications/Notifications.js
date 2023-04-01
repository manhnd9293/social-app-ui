import React, {useState} from 'react';
import {beClient} from "../../config/BeClient";
import {useQuery} from "react-query";
import utils from "../../utils/utils";

function loadNotifications({queryKey}) {
  const [_, page] = queryKey;
  return beClient.get(`/notifications?page=${page}`).then(res => res.data);
}

function Notifications() {
  const [page, setPage] = useState(0);
  const {data: notifications, isLoading, isError, error} = useQuery(['notifications', page], loadNotifications);

  return (
    <div>
      <div className={`subtitle mt-3`}>Notifications</div>
      {notifications && <div className={`list has-hoverable-list-items has-overflow-ellipsi has-background-white block`} style={{maxWidth: 600}}>
        {notifications.map(n =>
          <div className={`list-item is-clickable is-hoverable`} key={n._id}>
            <article className={`media`}>
              <figure className={`media-left is-64x64 image`}>
                <img className={`is-rounded`} src={n.from.avatar || utils.defaultAvatar} style={{width: 64, height: 64}}/>
              </figure>
              <div className={`media-content`}>
                <strong>{n.from.fullName}</strong> like your post
              </div>
            </article>
          </div>
        )}
      </div>}
    </div>
  );
}

export default Notifications;