import React, {useContext, useEffect, useRef, useState} from 'react';
import {ProfileUserContext} from "../../Profile";
import AddDataBtn from "../../common/AddDataBtn";
import WorkPlaceForm from "../userInfoForm/WorkPlaceForm";
import {useSelector} from "react-redux";
import {beClient} from "../../../../config/BeClient";
import {MutationAction} from "../../../../utils/Constant";

function getUserMostRecentWork(user) {
  if(!user.works) return null;

  const presentWorks = user.works.filter(w => w.isPresent);
  if(presentWorks.length > 0) return presentWorks[0];
  return user.works[0];
}

function OverviewWorkplace() {
  const {user, setUser} = useContext(ProfileUserContext);
  const work = getUserMostRecentWork(user);
  const [showWorkOptions, setShowWorkOptions] = useState(false);
  const [editWork, setEditWork] = useState(false);
  const [addWork, setAddWork] = useState(false);
  const moreOptionRef = useRef(null);
  const currentUser = useSelector(state => state.user);
  const isCurrentUser = currentUser._id === user._id;

  useEffect(() => {
    function handleBodyClick(e) {
      if(moreOptionRef.current && !moreOptionRef.current.contains(e.target)){
        setShowWorkOptions(false);
      }
    }

    document.body.addEventListener('mousedown', handleBodyClick);
    return () => {
      document.body.removeEventListener('mousedown', handleBodyClick);
    };
  }, []);



  async function onAddWork(work) {
    const {data} = await beClient.patch('/user/about', {
      [MutationAction.Push]: {
        works: work
      }
    });
    const updatedWork = structuredClone(work);
    updatedWork._id = data._id;
    setUser({...user, works: [updatedWork]})
    setAddWork(false);
  }

  async function updateWork(updatedData) {
    await beClient.patch('/user/about', {
      [MutationAction.Update]: {
        works: updatedData
      }
    });
    setUser({...user, works: [updatedData]})
    setEditWork(false);
    setShowWorkOptions(false)
  }

  async function deleteWork(workId) {
    await beClient.patch('/user/about', {
      [MutationAction.Pull]: {
        works: {
          _id: workId
        }
      }
    })

    setUser({...user, works: user.works?.filter(w => w._id !== workId) || []});
    setShowWorkOptions(false);
  }

  return (
    <div>
      {isCurrentUser && !work && !addWork && <AddDataBtn name={`Add a workplace`}
                                        onClick={()=> setAddWork(true)}
      />}
      {
        isCurrentUser && addWork &&
        <div style={{maxWidth: '80%'}} className={`mt-3`}>
          <WorkPlaceForm work={new Work()}
                         onSave={onAddWork}
                         onCancel={()=> setAddWork(false)}
          />
        </div>
      }
      { work && !editWork &&
        <div className={`is-flex mt-3 is-justify-content-space-between`}>
          {
            <div>
              <span className={`icon mr-3`}>
                <i className="fa-solid fa-briefcase"></i>
              </span>
              <span className={`is-size-6`}>
                {work.position || 'Work'} at <strong>{work.company}</strong>
              </span>
            </div>
          }

          {
            isCurrentUser &&
            <div className={`mr-6`}>
              <div className={`dropdown is-right ${showWorkOptions && `is-active`}`} ref={moreOptionRef}>
                <div className={`dropdown-trigger`}>
                  <div className={`icon is-clickable`}
                       onClick={() => setShowWorkOptions(!showWorkOptions)}
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </div>
                </div>
                <div className={`dropdown-menu`}>
                  <div className={`dropdown-content`}>
                    <a className={`dropdown-item`}
                       onClick={()=> setEditWork(true)}
                    >
                      <span className={`icon`}>
                        <i className="fa-solid fa-pen"></i>
                      </span>
                      <span className={`ml-1`}>Edit workplace</span>
                    </a>
                    <a className={`dropdown-item`}
                       onClick={() => deleteWork(work._id)}
                    >
                      <span className={`icon`}>
                        <i className="fa-solid fa-trash-can"></i>
                      </span>
                      <span className={`ml-1`}>Delete workplace</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          }

        </div>
      }
      {
        editWork &&
        <WorkPlaceForm work={work}
                       onSave={updateWork}
                       onCancel={()=> {
                         setEditWork(false);
                         setShowWorkOptions(false);
                       }}
        />
      }
    </div>

  );
}

function Work(company, position, city, description, isPresent) {
  this.company = company || '';
  this.position = position || '';
  this.city = city || '';
  this.description = description || '';
  this.isPresent = isPresent || false;
}

export default OverviewWorkplace;