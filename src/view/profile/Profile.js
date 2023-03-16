import React, {useContext} from 'react';
import {beClient} from "../../config/BeClient";
import {useLoaderData} from "react-router-dom";
import defaultAvatar from '../../common/img/defaultAvatar.jpg';
import utils from "../../utils/utils";
import {useSelector} from "react-redux";
import {SocketEvent} from "../../utils/Constant";
import FriendOptions from "../friend/FriendOptions";
import {SocketContext} from "../rootLayout/RootLayout";

function Profile() {
  const currentUser = useSelector(state => state.user);
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

  return (
    <div>
      <div>
        <figure className="image is-96x96">
          <img className={'is-rounded'} src={user.avatar || defaultAvatar} style={{width: 96, height: 96}}/>
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