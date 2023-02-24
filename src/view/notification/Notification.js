import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NotiActionType} from "../../store/notification/NotificationReducer";

function Notification(props) {
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();
  function closeModal() {
    dispatch({type: NotiActionType.Remove});
  }
  return (
    <div className={`modal is-active`}>
      <div className="modal-background" onClick={closeModal}></div>
      <div className='modal-card'>
        <div className='modal-card-head'>
          <div className='modal-card-title'> Error happen</div>
        </div>
        <div className='modal-card-body'>
          <div>{notification.message}</div>
        </div>
        <div className='modal-card-foot'>
          <button className='button is-primary'
                  onClick={closeModal}
          >Close</button>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  );
}

export default Notification;