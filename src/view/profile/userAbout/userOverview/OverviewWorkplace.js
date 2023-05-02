import React, {useContext, useState} from 'react';
import {ProfileUserContext} from "../../Profile";
import AddDataBtn from "../../common/AddDataBtn";
import WorkPlaceForm from "../userInfoForm/WorkPlaceForm";

function OverviewWorkplace() {
  const user = useContext(ProfileUserContext);
  const [work, setWork] = useState(user.work);
  const [showWorkOptions, setShowWorkOptions] = useState(false);
  const [editWork, setEditWork] = useState(false);
  const [addWork, setAddWork] = useState(false);
  const isCurrentUser = true;

  function onAddWork(work) {
    console.log({work});
    setWork(structuredClone(work));
    setAddWork(false);
  }

  function updateWork(updatedData) {
    setWork(updatedData);
    setEditWork(false);
    setShowWorkOptions(false)
  }

  function deleteWork() {
    setWork(null);
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
                {work.position} at <strong>{work.company}</strong>
              </span>
            </div>
          }

          {
            isCurrentUser &&
            <div className={`mr-6`}>
              <div className={`dropdown is-right ${showWorkOptions && `is-active`}`}>
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
                       onClick={deleteWork}
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

function Work(company, position, city, description) {
  this.company = company || '';
  this.position = position || '';
  this.city = city || '';
  this.description = description || ''
}
export default OverviewWorkplace;