import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import socket from '../../config/Socket';
import {SocketEvent} from "../../utils/Constant";
import MenuIcon from "./MenuIcon";
import MenuIconLink from "./MenuIconLink";
import ProfileDropdown from "./ProfileDropdown";

function Header() {

  const [unreadNotification, setUnreadNotification] = useState([]);
  const [unreadFriendRequest, setUnreadFriendRequest] = useState([]);
  const [unreadMessage, setUnReadMessage] = useState([]);

  useEffect(() => {

    socket.on(SocketEvent.FriendRequest, (request) => {
      setUnreadFriendRequest((old) => [...old, request]);

    })

   return () => {
      socket.off(SocketEvent.FriendRequest)
   }

  }, []);



  return (
    <div className='has-background-info navbar is-fixed-top'>
      <nav className="navbar is-large mx-auto is-info" role="navigation" aria-label="main navigation" style={{width: '80%',maxWidth: '1215px'}}>
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <span className='has-text-weight-bold'>H U N I</span>
          </Link>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
             data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">

            <MenuIconLink icon="fa-solid fa-house" name='Home' hasNumber={false} to='/'/>

            <MenuIconLink icon="fa-solid fa-building" name='company' hasNumber={false} to='/company'/>

            <MenuIconLink icon="fa-solid fa-user-group" list={unreadFriendRequest} name='connection' to='/friends' />

            <MenuIcon list={unreadMessage} icon="fa-solid fa-message" name='message'/>

            <MenuIcon list={unreadNotification} icon="fa-solid fa-bell" name='notification'/>

            <ProfileDropdown/>
          </div>
        </div>
      </nav>

    </div>
  );
}

export default Header;