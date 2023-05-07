
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {ProfileUserContext} from "../../Profile";
import AddDataBtn from "../../common/AddDataBtn";
import {beClient} from "../../../../config/BeClient";
import {MutationAction} from "../../../../utils/Constant";

function UserRelationshipOverview() {
  const {user, setUser} = useContext(ProfileUserContext);
  const [addRelationship, setAddRelationship] = useState(false);
  const [editRelationship, setEditRelationship] = useState(false);
  const currentUser = useSelector(state => state.user);
  const [showRelationshipOptions, setShowRelationshipOptions] = useState(false);
  const moreOptionRef = useRef(null);

  const isCurrentUser = currentUser._id === user._id;
  const currentRel = user.relationship;
  // const currentRel = 'Single';

  useEffect(() => {
    function handleBodyClick(e) {
      if(moreOptionRef.current && !moreOptionRef.current.contains(e.target)){
        setShowRelationshipOptions(false);
      }
    }

    document.body.addEventListener('mousedown', handleBodyClick);
    return () => {
      document.body.removeEventListener('mousedown', handleBodyClick);
    };
  }, []);


  async function deleteRel() {
    // call api delete hometown
    await beClient.patch('/user/about', {
      [MutationAction.Delete]: {
        relationship: 1
      }
    })
    setUser({...user, relationship: null});
    setEditRelationship(false);
    setShowRelationshipOptions(false);
  }

  async function onAddRel({name}) {
    // call api add hometown
    const updated = {...user.relationship, name};

    await beClient.patch('/user/about', {
      update: {
        relationship: updated
      }
    });
    setUser({...user, relationship: updated});
    setAddRelationship(false);
  };

  async function updateRelationship({name}) {
    // call api update hometown
    const updated = {...user.relationship, name};
    await beClient.patch('/user/about', {
      update: {
        relationship: updated
      }
    })
    setUser({...user, relationship: updated});
    setEditRelationship(false);
    setShowRelationshipOptions(false);
  }

  return (
    <div>
      {
        isCurrentUser && !currentRel && !addRelationship &&
        <AddDataBtn name={`Add current place`}
                    onClick={() => setAddRelationship(true)}
        />
      }
      {
        isCurrentUser && addRelationship &&
        <div>
          <RelationshipForm relationship={''}
                         onSave={onAddRel}
                         onCancel={() => setAddRelationship(false)}
          />
        </div>
      }
      {
        editRelationship &&
        <RelationshipForm relationship={currentRel}
                       onSave={updateRelationship}
                       onCancel={()=> {
                         setEditRelationship(false);
                         setShowRelationshipOptions(false);
                       }}

        />
      }
      {
        currentRel && !editRelationship &&
        <div className={`is-flex mt-3 is-justify-content-space-between`}>
          {
            <div>
              <span className={`icon mr-3`}>
                <i className="fa-solid fa-heart"></i>
              </span>
              <span className={`is-size-6`}>{currentRel.name}</span>
            </div>
          }

          {
            isCurrentUser &&
            <div className={`mr-6`}>
              <div className={`dropdown is-right ${showRelationshipOptions && `is-active`}`} ref={moreOptionRef}>
                <div className={`dropdown-trigger`}>
                  <div className={`icon is-clickable`}
                       onClick={() => setShowRelationshipOptions(!showRelationshipOptions)}
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </div>
                </div>
                <div className={`dropdown-menu`}>
                  <div className={`dropdown-content`}>
                    <a className={`dropdown-item`}
                       onClick={() => setEditRelationship(true)}
                    >
                      <span className={`icon`}>
                        <i className="fa-solid fa-pen"></i>
                      </span>
                      <span className={`ml-1`}>Edit Relationship</span>
                    </a>
                    <a className={`dropdown-item`}
                       onClick={deleteRel}
                    >
                      <span className={`icon`}>
                        <i className="fa-solid fa-trash-can"></i>
                      </span>
                      <span className={`ml-1`}>Delete Relationship</span>
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

function RelationshipForm({relationship, onSave, onCancel}) {
  const [name, setName] = useState(relationship.name);

  function handleSaveLivePlace() {
    onSave({name})
  }

  return (
    <div>
      <div className="field mt-1">
        <label className="label">Relationship</label>
        <div className="control select">
          <select  placeholder="Status"
                 value={name}
                 onChange={event => setName(event.target.value)}
          >
            <option>Status</option>
            <option>Single</option>
              <option>In a relationship</option>
              <option>Others</option>
          </select>
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

export default UserRelationshipOverview;