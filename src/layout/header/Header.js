import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../store/UserSlice";
import defaultAvatar from '../../common/img/defaultAvatar.jpg';

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logOut = () => {
    dispatch(userActions.logout());
    navigate('/login');
  }




  return (
    <nav className="navbar is-large is-info" role="navigation" aria-label="main navigation">
      <div className="navbar-brand ml-6">
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
          <Link className="navbar-item" to='/'>
            <span className='has-text-weight-bold'>Home</span>
          </Link>

          <Link className="navbar-item" to='/company'>
            <span className='has-text-weight-bold'>Company</span>
          </Link>

          <Link className="navbar-item" to='/company'>
            <span className='has-text-weight-bold'>Jobs</span>
          </Link>

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
  );
}

export default Header;