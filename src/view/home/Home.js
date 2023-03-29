import React from 'react';
import NewsFeed from "../newFeed/NewsFeed";
import {NavLink} from "react-router-dom";
import utils from "../../utils/utils";
import {useSelector} from "react-redux";

function Home() {
  const user = useSelector(state => state.user);
  return (
    <div className={'columns'}>
      <div className={'column is-3 mt-3 '}>
        <aside className='menu box' style={{position: 'sticky', top: 72}}>
          <ul className='menu-list'>
            <li>
              <NavLink
                className= {utils.navLinkActive}
                to='' end >
                <span className={`icon mr-4`}>
                  <i className="fa-solid fa-house"></i>
                </span>
                <span>News feed</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className= {utils.navLinkActive}
                to={`/profile/${user._id}`} end >
                <div className={`is-flex is-align-items-center`} style={{gap: 10}}>
                  <figure className="image is-32x32 ">
                    <img src={user.avatar || utils.defaultAvatar} className={`is-rounded`}
                         style={{width: 32, height: 32}} alt="Placeholder"/>
                  </figure>
                  <span>{user.fullName}</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink className= {utils.navLinkActive}
                       to='friends'>
                <span className={`icon mr-4`}>
                  <i className="fa-solid fa-user-group"></i>
                </span>
                <span>Friends</span>
              </NavLink>
            </li>

            <li>
              <NavLink className= {utils.navLinkActive}
                       to='conversations'>
                <span className={`icon mr-4`}>
                  <i className="fa-solid fa-message"></i>
                </span>
                <span>Messages</span>
              </NavLink>
            </li>

          </ul>
        </aside>
      </div>

      <div className={'column'}>
        <NewsFeed/>
      </div>
      <div className={`column is-2 mt-3`}>
        <span className={`subtitle is-5`}>Advertisements</span>
      </div>

    </div>
  );
}

export default Home;