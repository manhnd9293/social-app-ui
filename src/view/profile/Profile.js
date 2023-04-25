import React, {useEffect, useState} from 'react';
import {beClient} from "../../config/BeClient";
import {useLoaderData} from "react-router-dom";
import defaultAvatar from '../../common/img/defaultAvatar.jpg';
import utils from "../../utils/utils";
import {useSelector} from "react-redux";
import AvatarModal from "./avatar/AvatarModal";
import Intro from "./Intro";
import ProfilePhotos from "./ProfilePhotos";
import RegularFriends from "./RegularFriends";
import Timeline from "./Timeline";
import RelationManagement from "./relations/RelationManagement";

function Profile() {
  const currentUser = useSelector(state => state.user);
  const [profilePicModal, setProfilePicModal] = useState(false);
  const [initialUser, timeline] = useLoaderData();
  const [user, setUser] = useState(initialUser);


  useEffect(() => {
    setUser(initialUser);
  },[initialUser])



  const avatar = currentUser._id === user._id ? currentUser.avatar : user.avatar;

  useEffect(() => {
    if (/\/profile\/*/.test(window.location.pathname)) {
      window.scrollTo(0, 0);
    }
  }, [window.location.href]);



  return (
    <div>
      {profilePicModal && <AvatarModal avatar={avatar}
                                       setShowModal={setProfilePicModal}
      />}
      <div className={`mt-3`}>
        <figure className="image is-96x96 is-clickable" onClick={event => setProfilePicModal(true)}>
          <img className={'is-rounded'}
               src= { avatar || defaultAvatar} style={{width: 96, height: 96}}/>
        </figure>
        <div className='title is-size-4 mt-3 has-text-centered mb-3' style={{width: 96}}>{utils.upperCaseFirst(user.fullName)}</div>
      </div>
      <RelationManagement user={user}
      />
      <div className={`columns is-3 mt-3`}>
        <div className={`column is-5`}>
          <Intro/>
          <ProfilePhotos user={user}/>
          <RegularFriends user={user}/>
        </div>
        <div className={`column is-7`}>
          <Timeline initialPosts={timeline}/>
        </div>
      </div>
    </div>
  );
}

function loadProfileData({params}) {
  const {id} = params;

  return Promise.all([
    beClient.get(`/user/${id}/profile`).then(res => {
      return res.data;
    }),
    beClient.get(`/user/timeline?profileId=${id}`).then(res => {
      return res.data;
    })
  ])
}

export {loadProfileData}
export default Profile;