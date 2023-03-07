import React from 'react';
import {beClient} from "../../config/BeClient";
import {Link, useLoaderData} from "react-router-dom";

function FriendList(props) {
  const friends = useLoaderData();
  if (friends.length === 0) {
    return (
      <div>
        You current has no friend
      </div>
    )
  }
  return (
    <div>
      <div className='subtitle'>Friend List</div>
      {
        friends.map(friend =>
          <div key={friend._id} className='card mt-5'>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src={friend.friendId.avatar}
                         className='is-rounded'
                         style={{width: 48, height: 48}}/>
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-5">
                    <Link to={`/profile/${friend.friendId._id}`}>
                      {friend.friendId.fullName}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className='card-footer buttons p-3'>
              <div className='button is-rounded is-small' >Unfriend</div>
            </div>
          </div>
        )
      }
    </div>
  );
}
function loadFriendsList() {
  return beClient.get('/user/friends-list').then(res => res.data);
}

export {loadFriendsList};
export default FriendList;