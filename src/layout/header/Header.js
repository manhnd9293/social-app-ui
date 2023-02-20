import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOutUser} from "../../store/user/UserAction";

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(!user._id) return null;

  const logOut = () => {
    dispatch(logOutUser());
    navigate('/login');
  }

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
         <span>HuNi</span>
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
          <div className="navbar-item">
            <div className="buttons">
              <Link to={'/employee'}>
                <strong className={'button is-primary mr-3'}>
                  Employee
                </strong>
              </Link>
              <button className="button is-light is-small" onClick={logOut}>
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;