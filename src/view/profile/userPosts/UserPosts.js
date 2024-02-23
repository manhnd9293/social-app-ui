import React, {useContext} from 'react';
import Intro from "./intro/Intro";
import ProfilePhotos from "../ProfilePhotos";
import RegularFriends from "../RegularFriends";
import Timeline from "../Timeline";
import {ProfileUserContext} from "../Profile";

function UserPosts() {
  const userContext = useContext(ProfileUserContext);
  return (
    <>
      <div className={`columns is-3 mt-1`}>
        <div className={`column is-5`}>
          <Intro user={userContext.user}/>
          <ProfilePhotos user={userContext.user}/>
          <RegularFriends user={userContext.user}/>
        </div>
        <div className={`column mt-3 is-7`}>
          <Timeline initialPosts={userContext.timeline}/>
        </div>
      </div>
    </>
  );
}

export default UserPosts;