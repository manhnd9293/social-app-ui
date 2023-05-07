
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {ProfileUserContext} from "../../Profile";
import AddDataBtn from "../../common/AddDataBtn";
import {beClient} from "../../../../config/BeClient";
import {MutationAction} from "../../../../utils/Constant";

function OverviewCurrentPlace() {
  const {user, setUser} = useContext(ProfileUserContext);
  const [addCurrentPlace, setAddCurrentPlace] = useState(false);
  const [editCurrentPlace, setEditCurrentPlace] = useState(false);
  const currentUser = useSelector(state => state.user);
  const [showPlaceOptions, setShowPlaceOptions] = useState(false);
  const moreOptionRef = useRef(null);

  const isCurrentUser = currentUser._id === user._id;
  const currentPlace = user.currentPlace;

  useEffect(() => {
    function handleBodyClick(e) {
      if(moreOptionRef.current && !moreOptionRef.current.contains(e.target)){
        setShowPlaceOptions(false);
      }
    }

    document.body.addEventListener('mousedown', handleBodyClick);
    return () => {
      document.body.removeEventListener('mousedown', handleBodyClick);
    };
  }, []);


  async function deleteLivePlace() {
    // call api delete hometown
    await beClient.patch('/user/about', {
      [MutationAction.Delete]: {
        currentPlace: 1
      }
    })
    setUser({...user, currentPlace: null});
    setEditCurrentPlace(false);
    setShowPlaceOptions(false);
  }

  async function onAddHometown(currentPlace) {
    // call api add hometown
    await beClient.patch('/user/about', {
      update: {
        currentPlace
      }
    });
    setUser({...user, currentPlace});
    setAddCurrentPlace(false);
  };

  async function updateHometown(currentPlace) {
    // call api update hometown
    await beClient.patch('/user/about', {
      update: {
        currentPlace
      }
    })
    setUser({...user, currentPlace});
    setEditCurrentPlace(false);
    setShowPlaceOptions(false);
  }

  return (
    <div>
      {
        isCurrentUser && !currentPlace && !addCurrentPlace &&
        <AddDataBtn name={`Add current place`}
                    onClick={() => setAddCurrentPlace(true)}
        />
      }
      {
        isCurrentUser && addCurrentPlace &&
        <div>
          <LivePlaceForm hometown={new LivePlace()}
                        onSave={onAddHometown}
                        onCancel={() => setAddCurrentPlace(false)}
          />
        </div>
      }
      {
        editCurrentPlace &&
        <LivePlaceForm hometown={currentPlace}
                      onSave={updateHometown}
                      onCancel={()=> {
                        setEditCurrentPlace(false);
                        setShowPlaceOptions(false);
                      }}

        />
      }
      {
        currentPlace && !editCurrentPlace &&
        <div className={`is-flex mt-3 is-justify-content-space-between`}>
          {
            <div>
              <span className={`icon mr-3`}>
                <i className="fa-solid fa-house"></i>
              </span>
              <span className={`is-size-6`}>
                Lives in <strong>{currentPlace.name}</strong>
              </span>
            </div>
          }

          {
            isCurrentUser &&
            <div className={`mr-6`}>
              <div className={`dropdown is-right ${showPlaceOptions && `is-active`}`} ref={moreOptionRef}>
                <div className={`dropdown-trigger`}>
                  <div className={`icon is-clickable`}
                       onClick={() => setShowPlaceOptions(!showPlaceOptions)}
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </div>
                </div>
                <div className={`dropdown-menu`}>
                  <div className={`dropdown-content`}>
                    <a className={`dropdown-item`}
                       onClick={() => setEditCurrentPlace(true)}
                    >
                      <span className={`icon`}>
                        <i className="fa-solid fa-pen"></i>
                      </span>
                      <span className={`ml-1`}>Edit current place</span>
                    </a>
                    <a className={`dropdown-item`}
                       onClick={deleteLivePlace}
                    >
                      <span className={`icon`}>
                        <i className="fa-solid fa-trash-can"></i>
                      </span>
                      <span className={`ml-1`}>Delete current place</span>
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

function LivePlaceForm({hometown, onSave, onCancel}) {
  const [name, setName] = useState(hometown.name);

  function handleSaveLivePlace() {
    onSave({name})
  }

  return (
    <div>
      <div className="field">
        <label className="label">Current Place</label>
        <div className="control">
          <input className="input" type="text" placeholder="City or town"
                 value={name}
                 onChange={event => setName(event.target.value)}
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
                  disabled={!name}
                  onClick={handleSaveLivePlace}
          >Save</button>
        </div>
      </div>
    </div>
  )
}

function LivePlace(name) {
  this.name = name || '';
}


export default OverviewCurrentPlace;