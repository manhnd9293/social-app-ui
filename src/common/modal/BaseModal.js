import React, {useEffect} from 'react';

function BaseModal({children, closeModal, modalName}) {
  useEffect(() => {
    const root = document.getElementsByTagName( 'html' )[0];
    root.className += ' is-clipped';
    return () => {
      root.className = root.className.split(' ').filter(s => s !== 'is-clipped').join(' ')
    };
  }, []);

  return (
    <div className={`modal is-active`}>
      <div className={`modal-background has-background-white-bis`}
           onClick={closeModal}
           style={{opacity: 0.8}}
      />
      <div className={`modal-card card`}>
        <div className={`modal-card-head has-background-white`}>
          <p className={`modal-card-title has-text-centered`}>
            <strong>{modalName}</strong>
          </p>
          <button className="delete" aria-label="close"
                  onClick={closeModal}
          ></button>
        </div>
        <div className={`modal-card-body`}>
          {children}
        </div>
        <div className={`modal-card-foot has-background-white`}>
          <button className={`button`}>
            <strong className={`color`}>Cancel</strong>
          </button>
          <button className={`button is-info`}>
            <strong>Save</strong>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BaseModal;