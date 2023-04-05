import React, {useContext, useEffect, useState} from 'react';
import {beClient} from "../../config/BeClient";
import {Link, useLoaderData} from "react-router-dom";
import defaultAvatar from '../../common/img/defaultAvatar.jpg';
import utils from "../../utils/utils";
import {useSelector} from "react-redux";
import {SocketEvent} from "../../utils/Constant";
import FriendOptions from "../friend/FriendOptions";
import {SocketContext} from "../rootLayout/RootLayout";
import AvatarModal from "./avatar/AvatarModal";
import Post from "../newFeed/Post/Post";

function Profile() {
  const currentUser = useSelector(state => state.user);
  const [profilePicModal, setProfilePicModal] = useState(false);
  const [user, timeline] = useLoaderData();
  const socket = useContext(SocketContext);

  async function addConnection() {
    const requestBody = {
      message: 'Hi ban, cho minh lam wen voi',
      to: user._id,
      from: currentUser._id,
    };
    const newRequest = await beClient.post('/request', requestBody).then(res => res.data);
    socket.emit(SocketEvent.FriendRequest, newRequest);
  }
  const avatar = currentUser._id === user._id ? currentUser.avatar : user.avatar;

  useEffect(() => {
    if (/\/profile\/*/.test(window.location.pathname)) {
      window.scrollTo(0, 0);
    }
  }, [window.location.href]);

  useEffect(() => {

    return () => {

    };
  }, []);


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

      <div className={`columns is-3`}>
        <div className={`column is-5`}>
          <div className={`card`}>
            <strong>Intro</strong>
            <div>Bio</div>
            <div>Live</div>
            <div>Date of birth</div>
            <div>From</div>
            <div>Single</div>
          </div>

          <div className={`card mt-3`}>
            <div>
              <strong>Photos</strong>
            </div>
            <div className={`mt-1 columns is-multiline is-0`}>
              {
                user.recentPhotos.map(photo =>
                  <div className={`column is-4`} key={utils.objectId()}>
                    <figure className={`image is-128x128`}>
                      {/*<img style={{width:96, height: 96}} src={photo.url}/>*/}
                      <div style={{...utils.getStyleForImageBackground(photo.url), width: 128, height: 128}}></div>
                    </figure>
                  </div>
                )
              }
            </div>
          </div>

          <div className={`card mt-5`} style={{position: "sticky", top: 80}}>
            <strong>Friends ({user.friendList.length})</strong>
            <div className={`columns is-multiline mt-1`}>
              {user.friendList.slice(0,9).map(friend =>
                <Link key={friend._id} className={`column is-4 is-clickable has-text-black`} to={`/profile/${friend._id}`}>
                  <figure className={`image is-96x96`}>
                    <img style={{width:96, height: 96}} src={friend.avatar || utils.defaultAvatar}></img>
                  </figure>
                  <div className={`mt-1`}>{friend.fullName}</div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className={`column is-7`}>
          {
            timeline.map(post => <Post key={post._id}
                                       postData={post}

            />)
          }
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