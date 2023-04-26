import React, {useState} from 'react';
import {useSelector} from "react-redux";
import EditIntro from "./EditIntro";

function Intro() {
  const [edit, setEdit] = useState(false);
  const profileId = window.location.pathname.split('/')[2];
  const currentUser = useSelector(state => state.user);
  return (
    <>
      <div className={`card p-3`}>
        <strong className={`is-size-5`}>Intro</strong>
        <div>
        <span className={`icon mr-1`}>
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

export default Intro;