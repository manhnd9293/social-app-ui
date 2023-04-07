import React, {useContext, useEffect, useRef, useState} from 'react';
import {beClient} from "../../config/BeClient";
import {Link, useLoaderData} from "react-router-dom";
import defaultAvatar from '../../common/img/defaultAvatar.jpg';
import utils from "../../utils/utils";
import {useSelector} from "react-redux";
import { Relation, SocketEvent} from "../../utils/Constant";
import FriendOptions from "../friend/FriendOptions";
import {SocketContext} from "../rootLayout/RootLayout";
import AvatarModal from "./avatar/AvatarModal";
import Post from "../newFeed/Post/Post";

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

  const profileId = window.location.pathname.split('/')[2];
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
                <div className={`button`} style={{backgroundColor: '#eaeaea'}}>
                  <span style={{color: '#504d4d', fontWeight: 'bold'}}>Edit details</span>
                </div>
              }            </div>
          </div>

          <div className={`card mt-3`}>
            <div>
              <strong className={`ml-1`}>Photos</strong>
            </div>
            <div className={`mt-1 columns is-multiline`}
                 style={{width: '100%', margin: 0}}>
              {
                user.recentPhotos.map((photo) =>
                  <div className={`column is-4 is-clickable`}
                       key={utils.objectId()}
                       style={{padding:2}}>
                    <figure className={`image`}>
                      <div style={{...utils.getStyleForImageBackground(photo.url), height: 128}}></div>
                    </figure>
                  </div>
                )
              }
            </div>
          </div>

          <div className={`card mt-5`} style={{position: "sticky", top: 80}}>
            <strong className={`ml-1 is-size-6`}>Friends ({user.friendList.length})</strong>
            <div className={`columns is-multiline mt-1`} style={{margin: 0, width: '100%'}}>
              {user.friendList.slice(0,9).map(friend =>
                <Link key={friend._id}
                      className={`column is-4 is-clickable has-text-black p-0`}
                      to={`/profile/${friend._id}`}
                >
                  <figure className={`image`} style={{padding: 3}}>
                    <img style={{width:'100%', height: 130, maxWidth: 200}} src={friend.avatar || utils.defaultAvatar}></img>
                  </figure>
                  <div className={`mt-1 ml-1 mb-1`}>{utils.upperCaseFirst(friend.fullName)}</div>
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

function AddFriendButton({addConnection}) {
  return (
    <div className='buttons'>
      {<div className='button is-small is-rounded is-outlined is-info' onClick={addConnection}>
        <i className="fa-solid fa-user-plus mr-1"></i>
        <span className='has-text-weight-bold'>Add Connection</span>
      </div>}
    </div>
  )
}

function CancelRequestButton({onCancelRequest}) {
  return (
    <div className='buttons'>
      <div className='button is-small is-rounded is-outlined is-info' onClick={onCancelRequest}>
        <i className="fa-solid fa-user-minus mr-1"></i>
        <span className='has-text-weight-bold'>Cancel Request</span>
      </div>
    </div>
  )
}


function RelationManagement({user}) {
  const currentUser = useSelector(state => state.user);
  const profileUserId = user._id;
  const [currentState, setCurrentState] = useState(user.relation);
  const socket = useContext(SocketContext);

  useEffect(() => {
    setCurrentState(user.relation)
  }, [user])

  async function onAddRequest() {
    const requestBody = {
      message: 'Hi ban, cho minh lam wen voi',
      to: user._id,
      from: currentUser._id,
    };
    const newRequest = await beClient.post('/request', requestBody).then(res => res.data);
    socket.emit(SocketEvent.FriendRequest, newRequest);
    setCurrentState(Relation.SentRequest);
  }

  function onAcceptRequest() {
    console.log(`accept request from ${profileUserId}`);
    setCurrentState(Relation.Friend);
  }

  function onIgnoreRequest() {
    console.log(`ignore request from ${profileUserId}`);
    setCurrentState(Relation.Stranger);
  }

  function onCancelRequest() {
    console.log(`cancel request to ${profileUserId}`);
    setCurrentState(Relation.Stranger);
  }

  function unFriend() {
    console.log('unfriend profileUserId')
    setCurrentState(Relation.Stranger);
  }

  switch (currentState) {
    case Relation.Friend:
      return <FriendOptions onUnfriend={unFriend}/>
    case Relation.Stranger:
      return <AddFriendButton addConnection={onAddRequest}/>
    case Relation.SentRequest:
      return <CancelRequestButton onCancelRequest={onCancelRequest}/>
    case Relation.ReceiveRequest:
      return <ReceiveRequestOptions onAcceptRequest={onAcceptRequest}
                                    onIgnoreRequest={onIgnoreRequest}
      />
    default:
      return null;
  }
}

function ReceiveRequestOptions({onAcceptRequest, onIgnoreRequest}) {
  const optionList = [
    {
      label: 'Accept Request',
      handler: onAcceptRequest
    },
    {
      label: 'Ignore Request',
      handler: onIgnoreRequest
    }
  ]
  return (
   <RelationOptions label={`Received Invitations`}
                    optionsList={optionList}
   />
  )
}

function RelationOptions({label, optionsList}) {
  const [showFriendDropdown, setShowFriendDropdown] = useState(false);
  const dropdown = useRef(null);

  useEffect(() => {
    function handleClickOutSide(event) {
      if(dropdown.current && !dropdown.current.contains(event.target)){
        setShowFriendDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutSide)
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  return (
    <div className={`dropdown ${showFriendDropdown && 'is-active'}`} ref={dropdown}>
      <div className="dropdown-trigger">
        <button className="button is-outlined is-info " aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => setShowFriendDropdown(old => !old)}>
          <span>{label}</span>
          <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
        </button>
      </div>

      <div className='dropdown-menu' role='menu'>
        <div className='dropdown-content'>
          {
            optionsList.map(option =>
              <a key={option.label}
                className='dropdown-item'
                 onClick={e => option.handler(option)}
              >{option.label}</a>
            )
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