import React from 'react';
import {Link} from "react-router-dom";

function Header() {
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
        </a>

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
                <a className="button is-primary" href={`/employee`}>
                  <strong>
                   Employee
                  </strong>
                </a>
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