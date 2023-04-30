import React from 'react';

function AddDataBtn({name}) {
  return (
    <div className={`button is-outlined is-small is-info is-rounded mt-3`}>
            <span className={`icon`}>
              <i className="fa-solid fa-plus"></i>
            </span>
      <span>{name}</span>
    </div>
  )
}
export default AddDataBtn;