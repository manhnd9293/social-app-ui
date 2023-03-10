import React, {useEffect, useRef, useState} from 'react';

function FriendOptions() {
  const [showFriendDropdown, setShowFriendDropdown] = useState(false);
  const dropdown = useRef(null);
  const [label, setLabel] = useState('Friends');
  const changeLabel = (name) => () => {
    setShowFriendDropdown(false);
    setLabel(name);
  }

  useEffect(() => {
    function handleClickOutSide(event) {
      if(dropdown.current && !dropdown.current.contains(event.target)){
        setShowFriendDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  return (
    <div className={`dropdown ${showFriendDropdown && 'is-active'}`} ref={dropdown}>
      <div className="dropdown-trigger">
        <button className="button is-outlined is-info " aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => setShowFriendDropdown(old => !old)}>
          <span>{label}</span>
          <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
        </button>
      </div>

      <div className='dropdown-menu' role='menu'>
        <div className='dropdown-content'>
          <a className='dropdown-item' onClick={changeLabel('Unfollow')}>Unfollow</a>
          <a className='dropdown-item' onClick={changeLabel('Unfriend')}>Unfriend</a>
        </div>
      </div>
    </div>

  );
}

export default FriendOptions;