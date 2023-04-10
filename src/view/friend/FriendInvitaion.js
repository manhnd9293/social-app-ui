import React, {useContext, useEffect, useState} from 'react';
import {beClient} from "../../config/BeClient";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {FriendRequestState, SocketEvent} from "../../utils/Constant";
import {SocketContext} from "../rootLayout/RootLayout";
import {useDispatch} from "react-redux";
import {userActions} from "../../store/UserSlice";
import utils from "../../utils/utils";

function FriendInvitations() {
  const initialInvitations = useLoaderData();
  const [invitations, setInvitations] = useState(initialInvitations);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const unseenInviteIds = invitations.filter(i => !i.seen).map(i => i._id);

    if(invitations.length > 0 && unseenInviteIds.length > 0) {
      beClient.patch('/request/seen', {
        unseenIds: unseenInviteIds
      }).then(res => {
        const unseenInvitations = res.data;
        dispatch(userActions.seenFriendRequest({unseenInvitations}))
      })
    }
  }, [invitations]);



  async function acceptRequest(requestId) {
    const {conversation} = await beClient.patch('/request/state', {
      state: FriendRequestState.Accepted,
      requestId,
    }).then(res => res.data);

    socket.emit(SocketEvent.AcceptRequest, conversation);
    setInvitations(invitations.filter(invite => invite._id !== requestId))
  }

  async function declineRequest(requestId) {
    await beClient.patch('/request/state', {
      state: FriendRequestState.Decline,
      requestId,
    });

    setInvitations(invitations.filter(invite => invite._id !== requestId))
  }

  return (
    <div>
      <div className='subtitle'>Invitation list</div>
      <div className=' mt-3'>
        <ListRequest requests={invitations}
                     onAccept={acceptRequest}
                     onDecline={declineRequest}
        />
      </div>

    </div>
  );
}

function ListRequest({requests, onAccept, onDecline}) {
  // debugger
  return (
    <div className={`list has-visible-pointer-controls has-background-white`}>
      {
        requests.map(request =>
          <div key={request._id} className={`list-item`}
               style={!request.seen ? {backgroundColor: '#d6e1ee'} : {}}>
            <div className={`list-item-image`}>
              <figure className={`image is-64x64`}>
                <img className={`is-rounded`} src={request.from.avatar || utils.defaultAvatar}
                     style={{width: 64, height: 64}}
                />
              </figure>
            </div>

            <div className={`list-item-content`}>
              <div>
                <Link to={`/profile/${request.from._id}`}>
                  {request.from.fullName}
                </Link>
              </div>
            </div>

            <div className={`list-item-controls`}>
              <div className={`buttons is-right`}>
                <button className="button is-info is-small is-rounded"
                        onClick={() => onAccept(request._id)}>
                  Accept
                </button>
                <button className={`button  is-small is-rounded`}
                        onClick={() => onDecline(request._id)}>Ignore</button>
              </div>
            </div>
          </div>)
      }
    </div>

  )
}

function loadInvitationList (){
  return beClient.get('/user/invitations').then(res => res.data);
}

export {loadInvitationList}
export default FriendInvitations;