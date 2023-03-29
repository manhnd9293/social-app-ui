import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {SocketEvent} from "../../utils/Constant";
import MenuIcon from "./MenuIcon";
import MenuIconLink from "./MenuIconLink";
import ProfileDropdown from "./ProfileDropdown";
import {SocketContext} from "../../view/rootLayout/RootLayout";
import utils from "../../utils/utils";

function Header() {

  const [unreadNotification, setUnreadNotification] = useState([]);
  const [unreadFriendRequest, setUnreadFriendRequest] = useState([]);
  const [unreadMessage, setUnReadMessage] = useState([]);
  const socket = useContext(SocketContext);
  const [searchValue, setSearchValue] = useState(utils.getUrlQueryParam(`key`));
  const navigate = useNavigate();

  useEffect(() => {
    if(!socket) return;
    socket.on(SocketEvent.FriendRequest, (request) => {
      setUnreadFriendRequest((old) => [...old, request]);
    })

    return () => {
      socket.off(SocketEvent.FriendRequest)
    }

  }, [socket]);

  function searchGlobal(e) {
    if (e.key === 'Enter') {
      navigate(`/search?key=${searchValue}`)
    }
  }

  return (
    <div className='navbar is-fixed-top'>
      <nav className="navbar is-large mx-auto" role="navigation" aria-label="main navigation"
           style={{width: '80%', maxWidth: '1215px'}}>
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <span className='has-text-weight-bold has-text-info' style={{fontSize: 20}}>H U N I</span>
          </Link>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
             data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-start`}>
          <div className={`navbar-item`}>
            <div className={`control has-icons-left`}>
              <input className={`input is-small`}
                     type={`text`}
                     placeholder={`Search`}
                     value={searchValue}
                     onChange={e => setSearchValue(e.target.value)}
                     onKeyDown={searchGlobal}
                     style={{outline: 'none'}}
              />
              <span className={`icon is-left`}>
                <i className="fa-solid fa-magnifying-glass"></i>

              </span>
            </div>
          </div>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">

            <MenuIconLink icon="fa-solid fa-house" name='Home' hasNumber={false} to='/'/>

            <MenuIconLink icon="fa-solid fa-building" name='company' hasNumber={false} to='/company'/>

            <MenuIconLink icon="fa-solid fa-user-group" list={unreadFriendRequest} name='connection' to='/friends'/>

            <MenuIconLink list={unreadMessage} icon="fa-solid fa-message" name='message' to='/conversations'/>

            <MenuIcon list={unreadNotification} icon="fa-solid fa-bell" name='notification'/>

            <ProfileDropdown/>
          </div>
        </div>
      </nav>
    </div>

  );
}

export default Header;