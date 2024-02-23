import React from 'react';
import utils from "../../utils/utils";

function MenuIcon({list, icon, name, hasNumber = true, to = ''}) {
  list = list || [];

  const numberPart = (
    <span className={`${list.length === 0 && 'is-invisible'} has-background-danger tag is-danger is-normal`}
          style={{position: 'relative', top: -10, fontSize: 9}}>
        {list.length < 100 ? list.length : '99+'}
    </span>
  )


  return  (
    <div className='navbar-item is-clickable ' to={to}>
      <div className='is-flex is-flex-direction-column is-align-items-center'>
        <div>
          <i className={icon}></i>
          {hasNumber && list.length > 0 && numberPart}
        </div>
        <div style={{fontSize: 11}}>{utils.upperCaseFirst(name)}</div>
      </div>
    </div>
  );


}

export default MenuIcon;