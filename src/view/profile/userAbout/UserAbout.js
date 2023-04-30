import React, {useEffect, useState} from 'react';
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import utils from "../../../utils/utils";

function UserAbout() {

  return (
    <div>
      <div className={`block has-background-white mt-3 p-3`}>
        <div className={`is-size-5`}>
          <strong className={`mb-1`}>About</strong>
          <div className={`columns`}>
            <div className={`column is-3`}>
              <div className={`menu`}>
                <ul className={`menu-list`}>
                  {
                    menuItems.map(item =>
                    <li key={item.name} >
                      <NavLink className={utils.navLinkActive}
                               to={item.to}
                               end
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div>
              <Outlet/>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

const menuItems = [
  {
    name: 'Overview',
    to: ''
  },
  {
    name: 'Work and educations',
    to: 'work_and_educations'
  },

  {
    name: 'Places lived',
    to: 'places'
  },
  {
    name: 'Contact and basic info',
    to: 'contacts'
  },
  {
    name: 'Details about you',
    to: 'details'
  },

]

export default UserAbout;