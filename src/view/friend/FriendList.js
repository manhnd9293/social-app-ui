import React, {useState} from 'react';
import {beClient} from "../../config/BeClient";
import {Link, useLoaderData} from "react-router-dom";
import utils from "../../utils/utils";

function FriendList() {
  const friends = useLoaderData();
  const [allFriends, setAllFriends] = useState(friends);

  if (friends.length === 0) {
    return (
      <div>
        You current has no friend
      </div>
    )
  }

  async function unfriend(unfriendId) {
    await beClient.patch('/user/unfriend', {
      unfriendId
    });
    setAllFriends(allFriends.filter(f => f.friendId._id !== unfriendId));
  }

  return (
    <div>
      <div className='subtitle'>Friend List</div>
      <div className={`list has-visible-pointer-controls`}>
        {
          allFriends.map(friend =>
              <div key={friend._id} className={`list-item`}>
                <div className={`list-item-image`}>
                  <figure className={`image is-64x64`}>
                    <img className={`is-rounded`} src={friend.friendId.avatar || utils.defaultAvatar}
                         style={{width: 64, height: 64}}
                    />
                  </figure>
                </div>

                <div className={`list-item-content`}>
                  <div>
                    <Link to={`/profile/${friend.friendId._id}`}>
                      {friend.friendId.fullName}
                    </Link>
                  </div>
                </div>

                <div className={`list-item-controls`}>
                  <div className={`buttons is-right`}>
                    <div className={`button is-info`}>Message</div>
                    <button className="button" onClick={() => unfriend(friend.friendId._id)}>
                    Unfriend
                    </button>
                  </div>
                </div>
              </div>
          )
        }
      </div>
    </div>
  );
}

function loadFriendsList() {
  return beClient.get('/user/friends-list').then(res => res.data);
}

export {loadFriendsList};
export default FriendList;