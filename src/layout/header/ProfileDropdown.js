import React from 'react';
import defaultAvatar from "../../common/img/defaultAvatar.jpg";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../store/UserSlice";
import {navDropDownActions} from "../../store/NavDropSlice";

function ProfileDropdown(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navDropdown = useSelector(state => state.navDropdown);

  const user = useSelector((state) => state.user);
  const logOut = () => {
    dispatch(userActions.logout());
    navigate('/login');
  }

  function showDropdown(e) {
    e.stopPropagation();

    dispatch(
      navDropdown.profile ? navDropDownActions.hideDropdown()
      :navDropDownActions.showDropdown()
    )
  }

  return (
    <div className={`navbar-item has-dropdown ${navDropdown.profile ?  'is-active' : ''}`}
         onClick={showDropdown}
    >
      <div className='navbar-link is-arrowless is-flex is-flex-direction-column is-justify-content-center'>
        <figure  className='image is-32x32 is-1by1'>
          <img className="is-rounded" style={{maxHeight: '9rem'}} src={user?.avatar || defaultAvatar}/>
        </figure>
      </div>

      <div className='navbar-dropdown is-right'>
        <Link to={`/profile/${user._id}`} className='navbar-item'>Profile</Link>
        <Link to='/setting' className='navbar-item'>Setting</Link>
        <div className='navbar-divider'></div>
        <a className='navbar-item' onClick={logOut}>
          Sign out
        </a>
      </div>
    </div>
  );
}

export default ProfileDropdown;