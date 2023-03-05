import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../store/UserSlice";
import defaultAvatar from '../../common/img/defaultAvatar.jpg';
import socket from '../../config/Socket';
import {SocketEvent} from "../../utils/Constant";
import MenuIcon from "./MenuIcon";
import MenuIconLink from "./MenuIconLink";

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [unreadNotification, setUnreadNotification] = useState([]);
  const [unreadFriendRequest, setUnreadFriendRequest] = useState([]);
  const [unreadMessage, setUnReadMessage] = useState([]);


  const logOut = () => {
    dispatch(userActions.logout());
    navigate('/login');
  }

  useEffect(() => {

    socket.on(SocketEvent.FriendRequest, (request) => {
      setUnreadFriendRequest((old) => [...old, request]);

    })


   return () => {
      socket.off(SocketEvent.FriendRequest)
   }

  }, []);



  return (
    <div className='has-background-info' >
      <nav className="navbar is-large is-info mx-auto" role="navigation" aria-label="main navigation" style={{width: '80%',maxWidth: '1215px'}}>
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

            <MenuIcon icon="fa-solid fa-user-group" list={unreadFriendRequest} name='connection'/>

            <MenuIcon list={unreadMessage} icon="fa-solid fa-message" name='message'/>

            <MenuIcon list={unreadNotification} icon="fa-solid fa-bell" name='notification'/>



            <div className={`navbar-item has-dropdown is-hoverable`} >
              <figure  className='navbar-link is-arrowless image is-48x48'>
                <img className="is-rounded" src={user?.avatar || defaultAvatar}/>
              </figure>
              <div className='navbar-dropdown is-right'>
                <Link to={`/profile/${user._id}`} className='navbar-item'>Profile</Link>
                <Link to='/setting' className='navbar-item'>Setting</Link>
                <div className='navbar-divider'></div>
                <a className='navbar-item' onClick={logOut}>
                  Sign out
                </a>
              </div>
            </div>

          </div>
        </div>
      </nav>

    </div>
  );
}

export default Header;