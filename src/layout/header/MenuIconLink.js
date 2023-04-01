import React from 'react';
import utils from "../../utils/utils";
import {Link} from "react-router-dom";

function MenuIconLink({number, icon, name, hasNumber = true, to}) {


  const numberPart = (
    <span className={`${number === 0 && 'is-invisible'} has-background-danger tag is-danger is-normal`}
          style={{position: 'relative', top: -10, fontSize: 9, borderRadius: 20, padding: 6}}>
        {number < 100 ? number : '99+'}
    </span>
  )


  return  (
    <Link className='navbar-item is-clickable ' to={to}>
      <div className='is-flex is-flex-direction-column is-align-items-center'>
        <div>
          <i className={icon}></i>
          {(hasNumber && number > 0) && numberPart}
        </div>
        <div style={{fontSize: 11}}>{utils.upperCaseFirst(name)}</div>
      </div>
    </Link>
  );


}

export default MenuIconLink;