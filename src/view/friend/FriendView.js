import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import utils from "../../utils/utils";

function FriendView() {
  return (
    <div style={{width: '75%'}}>
      <div className='title is-size-4 mt-3'>Friends</div>
      <div className='columns'>
        <aside className='menu column is-3'>
          <p className="menu-label">
            Manage connections
          </p>
          <ul className='menu-list'>
            <li>
              <NavLink
                className= {utils.navLinkActive}
                to='' end >
                Your friends
              </NavLink>
            </li>
            <li>
              <NavLink className= {utils.navLinkActive}
                    to='invite'>
                Invitations
              </NavLink>
            </li>
            <li>
              <NavLink to='requests'
                    className={utils.navLinkActive}
              >
                Requests sent
              </NavLink>
            </li>
          </ul>
        </aside>
        <div className='column'>
          <Outlet/>
        </div>
      </div>
    </div>

  );
}

export default FriendView;