import React, {useContext, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {ProfileUserContext} from "../../Profile";
import AddDataBtn from "../../common/AddDataBtn";

function HomeTownInfo() {
  const {user, setUser} = useContext(ProfileUserContext);
  const [addHometown, setAddHomeTown] = useState(false);
  const [editHometown, setEditHometown] = useState(false);
  const currentUser = useSelector(state => state.user);
  const [showHometownOptions, setShowHometownOptions] = useState(false);
  const moreOptionRef = useRef(null);

  const isCurrentUser = currentUser._id === user._id;
  const hometown = user.hometown;

  useEffect(() => {
    function handleBodyClick(e) {
      if(moreOptionRef.current && !moreOptionRef.current.contains(e.target)){
        setShowHometownOptions(false);
      }
    }

    document.body.addEventListener('mousedown', handleBodyClick);
    return () => {
      document.body.removeEventListener('mousedown', handleBodyClick);
    };
  }, []);


  function deleteHometown() {
    // call api delete hometown
    setUser({...user, hometown: null});
    setEditHometown(false);
    setShowHometownOptions(false);
  }

  function onAddHometown(data) {
    // call api add hometown
    setUser({...user, hometown: data});
    setAddHomeTown(false);
  };

  function updateHometown(cityTown) {
    // call api update hometown
    setUser({...user, hometown: cityTown});
    setEditHometown(false);
    setShowHometownOptions(false);
  }

  return (
    <div>
      {
        isCurrentUser && !hometown && !addHometown &&
        <AddDataBtn name={`Add a hometown`}
                    onClick={() => setAddHomeTown(true)}
        />
      }
      {
        isCurrentUser && addHometown &&
        <div>
          <HomeTownForm hometown={new HomeTown()}
                        onSave={onAddHometown}
                        onCancel={() => setAddHomeTown(false)}
          />
        </div>
      }
      {
        editHometown &&
        <HomeTownForm hometown={hometown}
                      onSave={updateHometown}
                      onCancel={()=> {
                        setEditHometown(false);
                        setShowHometownOptions(false);
                      }}

        />
      }
      {
        hometown && !editHometown &&
        <div className={`is-flex mt-3 is-justify-content-space-between`}>
          {
            <div>
              <span className={`icon mr-3`}>
                <i className="fa-solid fa-location-dot"></i>
              </span>
              <span className={`is-size-6`}>
                From {hometown}
              </span>
            </div>
          }

          {
            isCurrentUser &&
            <div className={`mr-6`}>
              <div className={`dropdown is-right ${showHometownOptions && `is-active`}`} ref={moreOptionRef}>
                <div className={`dropdown-trigger`}>
                  <div className={`icon is-clickable`}
                       onClick={() => setShowHometownOptions(!showHometownOptions)}
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </div>
                </div>
                <div className={`dropdown-menu`}>
                  <div className={`dropdown-content`}>
                    <a className={`dropdown-item`}
                       onClick={() => setEditHometown(true)}
                    >
                      <span className={`icon`}>
                        <i className="fa-solid fa-pen"></i>
                      </span>
                      <span className={`ml-1`}>Edit hometown</span>
                    </a>
                    <a className={`dropdown-item`}
                       onClick={deleteHometown}
                    >
                      <span className={`icon`}>
                        <i className="fa-solid fa-trash-can"></i>
                      </span>
                      <span className={`ml-1`}>Delete hometown</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          }

        </div>
      }
    </div>
  );
}

function HomeTownForm({hometown, onSave, onCancel}) {
  const [cityTown, setCityTown] = useState(hometown.cityTown);

  function handleSaveHometown() {
    onSave({cityTown})
  }

  return (
    <div>
      <div className="field">
        <label className="label">Company</label>
        <div className="control">
          <input className="input" type="text" placeholder="City or town"
                 value={cityTown}
                 onChange={event => setCityTown(event.target.value)}
          />
        </div>
      </div>

      <div className="field is-grouped mt-3">
        <div className="control">
          <button className="button is-link is-light is-small has-text-weight-bold"
                  onClick={onCancel}
          >Cancel</button>
        </div>
        <div className="control">
          <button className={`button is-info is-small has-text-weight-bold`}
                  disabled={!cityTown}
                  onClick={handleSaveHometown}
          >Save</button>
        </div>
      </div>

    </div>
  )
}

function HomeTown(cityTown) {
  this.cityTown = cityTown || '';
}

export default HomeTownInfo;