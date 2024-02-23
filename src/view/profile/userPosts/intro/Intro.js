import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import EditIntro from "./EditIntro";
import {beClient} from "../../../../config/BeClient";
import {MutationAction} from "../../../../utils/Constant";

function Intro({user}) {
  const [edit, setEdit] = useState(false);
  const profileId = window.location.pathname.split('/')[2];
  const currentUser = useSelector(state => state.user);
  const isCurrentUser = user._id === currentUser._id;
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState(user.bio);

  async function saveBio(content) {
    await beClient.patch('/user/about', {
      [MutationAction.Update]: {bio: content}
    });
    setBio(content);
    setEditBio(false);
  };

  useEffect(() => {
    setBio(user.bio);

    return () => {
      setEditBio(false);
    }
  }, [user._id])

  return (
    <>
      <div className={`card p-3`}>
        <strong className={`is-size-5`}>Intro</strong>
        <div className={`mt-1 has-text-centered`}>
          {
            !editBio && bio && bio
          }
        </div>
        {
          isCurrentUser && !editBio &&
          <div className={`mt-3`}>
            <button className={`button`} style={{backgroundColor: '#eaeaea'}}
                    onClick={()=> setEditBio(true)}
            >
              <span style={{color: '#504d4d'}} >{bio ? 'Update Bio' : 'Add Bio'}</span>
            </button>
          </div>
        }
        {
          editBio && isCurrentUser &&
          <div className={`mt-3`}>
            <BioEditBox content={bio}
                        onCancel={()=> setEditBio(false)}
                        onSave={saveBio}
            />
          </div>
        }
        {
          user.works && user.works.length > 0 &&
          <div>
            <span className={`icon mr-1 mt-2`}>
              <i className="fa-solid fa-briefcase"></i>
            </span>
            <span>{user.works[0].position || 'Work'} at {user.works[0].company}</span>
          </div>
        }
        {
          user.educations &&
          <div>
            <span className={`icon mr-1 mt-2`}>
              <i className="fa-solid fa-graduation-cap"></i>
            </span>
          <span>Studied at Foreign Trade University</span>
        </div>}
        {
          user.currentPlace &&
          <div>
            <span className={`icon mr-1`}>
              <i className="fa-solid fa-house-chimney"></i>
            </span>
            <span>Lives in {user.currentPlace.name}</span>
          </div>
        }
        {
          user.dob &&
          <div>
            <span className={`icon mr-1`}>
              <i className="fa-solid fa-cake-candles"></i>
            </span>
            <span>Birth {user.dob.date}</span>
          </div>
        }
        {
          user.hometown &&
          <div>
            <span className={`icon mr-1`}>
              <i className="fa-solid fa-location-dot"></i>
            </span>
            <span>From {user.hometown.name}</span>
          </div>
        }
        {
          user.relationship &&
          <div>
            <span className={`icon mr-1`}>
              <i className="fa-solid fa-heart"></i>
            </span>
            <span>{user.relationship.name}</span>
          </div>
        }
        <div className={`mt-3`}>
          {
            currentUser._id === profileId &&
            <div className={`button`} style={{backgroundColor: '#eaeaea'}}
                 onClick={()=>setEdit(true)}
            >
              <span style={{color: '#504d4d'}}>Edit details</span>
            </div>
          }
        </div>
      </div>
      {edit && <EditIntro onClose={()=> setEdit(false)}/>}
    </>
  );
}

function BioEditBox({content, onCancel, onSave}) {
  const [bioContent, setBioContent] = useState(content || '');
  const [remainChar, setRemainChar] = useState(101 - bioContent.length);

  const updateBio = ()=> {
    onSave(bioContent)
  };
  const onChangeBioContent = e => {
    const newContent = e.target.value;
    const addChar = newContent.length > bioContent.length;
    if((remainChar > 0 && addChar) || !addChar) {
      setBioContent(newContent);
      setRemainChar(v => v + (addChar ? -1 : 1));
    }
  };
  return (
    <div>
      <textarea className={`textarea has-fixed-size`}
                value={bioContent}
                onChange={onChangeBioContent}
                rows={3}
                placeholder={`Describe who you are`}
      />
      <div>
        {`${remainChar} characters remaining`}
      </div>
      <div className={`buttons mt-3`}>
        <div className={`button is-small`} onClick={onCancel}>
          Cancel
        </div>

        <div className={`button is-info is-small`} onClick={updateBio}>
          Save
        </div>
      </div>
    </div>
  )
}

export default Intro;