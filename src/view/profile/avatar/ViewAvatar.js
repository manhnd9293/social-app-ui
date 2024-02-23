import React from 'react';
import {useSelector} from "react-redux";

function ViewAvatar({avatar, setEditing}) {
  const user = useSelector(state => state.user);
  const profileId = window.location.pathname.split('/')[2];
  console.log({profileId})
  function deleteAvatar() {
    console.log(`delete avatar`);
  }

  return (
    <>
      <div className={`modal-card-body has-background-white-bis`}>
        <div className={`is-flex is-justify-content-center is-align-items-center`}>
          <figure className="image is-128x128">
            <img className={'is-rounded'} src={avatar} style={{width: 128, height: 128}}/>
          </figure>
        </div>
      </div>
      <div className={`modal-card-foot`}>
        {
          user._id === profileId && <>
            <button className={`button`} onClick={deleteAvatar}>Delete Avatar</button>
            <button className={`button is-info`} onClick={event => setEditing(true)}>Edit</button>
          </>
        }
      </div>
    </>
  );
}

export default ViewAvatar;