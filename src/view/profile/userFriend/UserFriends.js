import React from 'react';
import {Link} from "react-router-dom";

function UserFriends() {
  return (
    <div>
      <div className={`block has-background-white mt-3 p-3`}>
        <div className={`is-flex is-justify-content-space-between`}>
          <div className={`is-size-5`}>
            <strong>Friends</strong>
          </div>
          <div className={`is-flex 
          is-justify-content-space-evenly 
          is-align-items-center
          `}
               style={{gap: 20}}
          >
            <div className={`control has-icons-left`}>
              <input className={`input is-rounded`}
                     type={'text'}
                     placeholder={`Search`}
                     style={{width: 200}}
              />
              <span className={`icon is-left`}>
                <i className="fa-solid fa-magnifying-glass"></i>

              </span>
            </div>
            <div>
              <Link to={'/friends/invite'}>
                <strong>Find requests</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFriends;