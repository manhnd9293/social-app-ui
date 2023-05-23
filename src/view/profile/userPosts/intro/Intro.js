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
        <div>
        <span className={`icon mr-1 mt-2`}>
          <i className="fa-solid fa-graduation-cap"></i>
        </span>
          <span>Studied at Foreign Trade University</span>
        </div>
        <div>
        <span className={`icon mr-1`}>
          <i className="fa-solid fa-house-chimney"></i>
        </span>
          <span>Lives in Hanoi, Vietnam</span>
        </div>
        <div>
        <span className={`icon mr-1`}>
          <i className="fa-solid fa-cake-candles"></i>
        </span>
          <span>Birth 9 Jan 1993</span>
        </div>
        <div>
        <span className={`icon mr-1`}>
          <i className="fa-solid fa-location-dot"></i>
        </span>
          <span>From Thai Binh</span>
        </div>
        <div>
        <span className={`icon mr-1`}>
          <i className="fa-solid fa-heart"></i>
        </span>
          <span>Single</span>
        </div>
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

const maxContentLength = 101;
function BioEditBox({content, onCancel, onSave}) {
  const [bioContent, setBioContent] = useState(content || '');

  const [remainChar, setRemainChar] = useState(maxContentLength - bioContent.length);
  const updateBio = ()=> {
    onSave(bioContent)
  };
  const onChangeBioContent = e => {
    const newContent = e.target.value;
    if(newContent.length > maxContentLength) return;
    setBioContent(newContent);
    setRemainChar(maxContentLength - newContent.length);
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