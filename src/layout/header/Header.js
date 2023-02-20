import React from 'react';
import {Link} from "react-router-dom";

function Header() {
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
              <a className="button is-light">
                Log out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;