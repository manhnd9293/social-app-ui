import React from 'react';

function AddDataBtn({name, onClick}) {
  return (
    <div className={`button is-outlined is-small is-info is-rounded mt-3`} onClick={onClick}>
            <span className={`icon`}>
              <i className="fa-solid fa-plus"></i>
            </span>
      <span>{name}</span>
    </div>
  )
}
export default AddDataBtn;