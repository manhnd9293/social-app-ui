import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {notificationActions} from "../../store/NotificationSlice";

function NotificationModal() {
  const notification = useSelector(state => state.notification);
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(notificationActions.remove());
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

export default NotificationModal;