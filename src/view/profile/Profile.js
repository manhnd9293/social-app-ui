import React, {createContext, useEffect, useState} from 'react';
import {beClient} from "../../config/BeClient";
import {Link, Outlet, useLoaderData} from "react-router-dom";
import defaultAvatar from '../../common/img/defaultAvatar.jpg';
import utils from "../../utils/utils";
import {useSelector} from "react-redux";
import AvatarModal from "./avatar/AvatarModal";
import RelationManagement from "./userPosts/relations/RelationManagement";

const ProfileUserContext = createContext(null);
function Profile() {
  const currentUser = useSelector(state => state.user);
  const [profilePicModal, setProfilePicModal] = useState(false);
  const [initialUser, timeline] = useLoaderData();
  const [user, setUser] = useState(initialUser);


  useEffect(() => {
    setUser(initialUser);
  },[initialUser])

  const avatar = currentUser._id === user._id ? currentUser.avatar : user.avatar;
  const lastPathname = getLastPathName();
  const tabs = getTabData(user) || [];

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
      <div className={`has-background-white p-3`}>
        <div className={`mt-3`}>
          <figure className="image is-96x96 is-clickable" onClick={event => setProfilePicModal(true)}>
            <img className={'is-rounded'}
                 src={avatar || defaultAvatar} style={{width: 96, height: 96}}/>
          </figure>
          <div className='title is-size-4 mt-3 has-text-centered mb-3'
               style={{width: 96}}>{utils.upperCaseFirst(user.fullName)}</div>
        </div>
        <RelationManagement user={user}/>
        {/*<div style={{height: 1, backgroundColor: '#e0e0e0'}} className={`mt-2`}/>*/}
        <div className="tabs">
          <ul>
            {
              tabs.map(tab =>
                <li className={lastPathname === tab.path ? `is-active` : ``} key={tab.name}>
                  <Link to={tab.to}><strong>{tab.name}</strong></Link>
                </li>
              )
            }

          </ul>
        </div>
      </div>
      <ProfileUserContext.Provider value={{user, timeline, setUser}}>
        <Outlet/>
      </ProfileUserContext.Provider>
    </div>
  );
}
function getTabData(user) {
  const tabs = [
    {
      path: '',
      name: "Posts",
      to: `/profile/${user._id}`
    },
    {
      path: 'about',
      name: 'About',
      to: 'about'
    },
    {
      path: 'friends',
      name: 'Friends',
      to: 'friends'
    },
    {
      path: 'photos',
      name: 'Photos',
      to: 'photos'
    }
  ]
  return tabs;
}

function getLastPathName() {
  const paths = window.location.pathname.split('/');
  if (paths.length === 3) return '';
  return paths[3];
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

export {loadProfileData, ProfileUserContext}
export default Profile;