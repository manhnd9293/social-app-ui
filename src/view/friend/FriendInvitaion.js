import React, {useState} from 'react';
import {beClient} from "../../config/BeClient";
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {FriendRequestState} from "../../utils/Constant";

function FriendInvitations(props) {
  const [invitations, setInvitations] = useState(useLoaderData());
  const navigate = useNavigate();

  function acceptRequest(requestId) {
    return async function () {
      await beClient.patch('/request/state', {
        state: FriendRequestState.Accepted,
        requestId,
      });

    }
  }

  function declineRequest(requestId) {
    return async function () {
      await beClient.patch('/request/state', {
        state: FriendRequestState.Decline,
        requestId,
      });

      setInvitations(invitations.filter(invite => invite._id !== requestId))
    }
  }

  return (
    <div>
      <div className='subtitle'>Invitation list</div>
      <div className=' mt-3'>
        {invitations.map(invite =>
          <div key={invite._id} className='card mt-5'>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src={invite.from.avatar} className='is-rounded' alt="Placeholder image"/>
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-5">
                    <Link to={`/profile/${invite.from._id}`}>
                      {invite.from.fullName}
                    </Link>
                  </p>
                  <p className="subtitle is-6">{invite.message}</p>
                </div>
              </div>
            </div>
            <div className='card-footer buttons p-3'>
              <div className='button is-rounded is-small' onClick={declineRequest(invite._id)}>Ignore</div>
              <div className='button is-info is-rounded is-small' onClick={acceptRequest(invite._id)}>Accept</div>
            </div>
          </div>)}
      </div>

    </div>
  );
}

function loadInvitationList (){
  return beClient.get('/user/invitations').then(res => res.data);
}

export {loadInvitationList}
export default FriendInvitations;