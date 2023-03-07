import React from 'react';
import {beClient} from "../../config/BeClient";
import {useLoaderData} from "react-router-dom";
import defaultAvatar from '../../common/img/defaultAvatar.jpg';
import utils from "../../utils/utils";
import {useSelector} from "react-redux";
import {SocketEvent} from "../../utils/Constant";
import socket from "../../config/Socket";

function Profile(props) {
  const currentUser = useSelector(state => state.user);

  const user = useLoaderData();
  user.connections = connections;


  function addConnection() {
    socket.emit(SocketEvent.FriendRequest,
      {
        message: 'Hi ban, cho minh lam wen voi',
        to: user._id,
        from: currentUser._id,
      });
  }

  return (
    <div>
      <div>
        <figure className="image  is-96x96">
          <img className={'is-rounded'} src={user.avatar || defaultAvatar}/>
        </figure>
        <div className='title is-size-4 mt-3'>{utils.upperCaseFirst(user.fullName)}</div>
      </div>

      <div className='mt-3 buttons'>
        {currentUser._id !== user._id && <div className='button is-small is-rounded is-outlined is-info' onClick={addConnection}>
          <i className="fa-solid fa-user-plus mr-1"></i>
          <span className='has-text-weight-bold'>Add Connection</span>
        </div>}
      </div>

      <div className='mt-3'>
        <div className='subtitle'>Connections</div>
        <div className='columns is-multiline'>
          {[...user.connections].map( con => (
            <div className='column is-3 is-clickable'>
              <div className='card'
                   key={con._id}>
                <div className='card-content'>
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img className='is-rounded' src={con.avatar || defaultAvatar} alt="Placeholder image" />
                      </figure>
                    </div>
                    <div className="media-content">
                      <p className="title is-6">{con.fullName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}

function loadProfileData({params}) {
  const {id} = params;
  return beClient.get(`/user/${id}/profile`).then(res => {
    return res.data;
  })
}

const connections = [
  {
    _id: 1,
    fullName: 'First',
  },
  {
    _id: 2,
    fullName: 'Second',
  },
  {
    _id: 3,
    fullName: 'Third',
  },
  {
    _id: 4,
    fullName: 'Second',
  },
  {
    _id: 5,
    fullName: 'First',
  },
  {
    _id: 6,
    fullName: 'Second',
  },
]
export {loadProfileData}
export default Profile;