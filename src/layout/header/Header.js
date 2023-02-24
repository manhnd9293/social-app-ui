import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../store/UserSlice";

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(!user._id) return null;

  const logOut = () => {
    dispatch(userActions.logout());
    navigate('/login');
  }

  return (
    <nav className="navbar is-link" role="navigation" aria-label="main navigation">
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
          <div className="navbar-item">
            <div className="buttons">
                <Link to={'/company'}>
                  <strong className={'button mr-3 is-link'}>
                    Company
                  </strong>
                </Link>
              <Link to={'/employee'}>
                <strong className={'button is-link mr-3'}>
                  Employee
                </strong>
              </Link>
              <button className="button is-link" onClick={logOut}>
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