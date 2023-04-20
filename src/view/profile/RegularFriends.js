import React from 'react';
import {Link} from "react-router-dom";
import utils from "../../utils/utils";

function RegularFriends({user}) {
  return (
    <div className={`card mt-5`} style={{position: "sticky", top: 80}}>
      <strong className={`ml-1 is-size-6`}>Friends ({user.friendList.length})</strong>
      <div className={`columns is-multiline mt-1`} style={{margin: 0, width: '100%'}}>
        {user.friendList.slice(0,9).map(friend =>
          <Link key={friend._id}
                className={`column is-4 is-clickable has-text-black p-0`}
                to={`/profile/${friend._id}`}
          >
            <figure className={`image`} style={{padding: 3}}>
              <img style={{width:'100%', height: 130, maxWidth: 200}} src={friend.avatar || utils.defaultAvatar}></img>
            </figure>
            <div className={`mt-1 ml-1 mb-1`}>{utils.upperCaseFirst(friend.fullName)}</div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default RegularFriends;