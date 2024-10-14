import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import MenuIconLink from "./MenuIconLink";
import ProfileDropdown from "./ProfileDropdown";
import utils from "../../utils/utils";

import logo from '../../assets/connectivity.png'
import {useSelector} from "react-redux";

function Header() {

  const [searchValue, setSearchValue] = useState(utils.getUrlQueryParam(`key`));
  const navigate = useNavigate();
  const user = useSelector(state => state.user);


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
            <img width={30} height={28} src={logo}/>
            <span className='has-text-link ml-2' style={{fontSize: 20, fontWeight: 'bolder', letterSpacing: 4}}>HUNI</span>
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

            <MenuIconLink icon="fa-solid fa-user-group"
                          name='connection'
                          to={user.unseenInvitations > 0 ? '/friends/invite' : '/friends'}
                          number={user.unseenInvitations}
            />

            <MenuIconLink icon="fa-solid fa-message"
                          name='message'
                          to='/conversations'
                          number={user.unreadMessages}
            />

            <MenuIconLink number={user.unreadNotifications}
                          to={`notifications`}
                          icon="fa-solid fa-bell"
                          name='notification'/>

            <ProfileDropdown/>
          </div>
        </div>
      </nav>
    </div>

  );
}

export default Header;