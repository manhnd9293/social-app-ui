import React, {useContext, useEffect, useState} from 'react';
import {beClient} from "../../config/BeClient";
import {useLoaderData} from "react-router-dom";
import defaultAvatar from '../../common/img/defaultAvatar.jpg';
import utils from "../../utils/utils";
import {useSelector} from "react-redux";
import {SocketEvent} from "../../utils/Constant";
import FriendOptions from "../friend/FriendOptions";
import {SocketContext} from "../rootLayout/RootLayout";
import AvatarModal from "./avatar/AvatarModal";

function Profile() {
  const currentUser = useSelector(state => state.user);
  const [profilePicModal, setProfilePicModal] = useState(false);
  const user = useLoaderData();
  const socket = useContext(SocketContext);

  async function addConnection() {
    const requestBody = {
      message: 'Hi ban, cho minh lam wen voi',
      to: user._id,
      from: currentUser._id,
    };
    const newRequest = await beClient.post('/request', requestBody).then(res => res.data);
    socket.emit(SocketEvent.FriendRequest,
      newRequest);
  }
  const avatar = currentUser._id === user._id ? currentUser.avatar : user.avatar;


  useEffect(() => {
    if (/\/profile\/*/.test(window.location.pathname)) {
      window.scrollTo(0, 0);
    }
  }, [window.location])
  return (
    <div>
      {profilePicModal && <AvatarModal avatar={avatar}
                                       setShowModal={setProfilePicModal}
      />}
      <div>
        <figure className="image is-96x96 is-clickable" onClick={event => setProfilePicModal(true)}>
          <img className={'is-rounded'}
               src= { avatar || defaultAvatar} style={{width: 96, height: 96}}/>
        </figure>
        <div className='title is-size-4 mt-3'>{utils.upperCaseFirst(user.fullName)}</div>
      </div>

      <div className='mt-3 buttons'>
        {currentUser._id !== user._id && !user.isFriend && <div className='button is-small is-rounded is-outlined is-info' onClick={addConnection}>
          <i className="fa-solid fa-user-plus mr-1"></i>
          <span className='has-text-weight-bold'>Add Connection</span>
        </div>}
      </div>

      {
        user.isFriend && (
          <FriendOptions/>
        )
      }


    </div>
  );
}

function loadProfileData({params}) {
  const {id} = params;
  return beClient.get(`/user/${id}/profile`).then(res => {
    return res.data;
  })
}

export {loadProfileData}
export default Profile;