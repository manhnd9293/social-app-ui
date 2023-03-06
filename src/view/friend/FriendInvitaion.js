import React from 'react';
import {beClient} from "../../config/BeClient";
import {Link, useLoaderData} from "react-router-dom";

function FriendInvitations(props) {
  const invitations = useLoaderData();

  return (
    <div>
      <div className='subtitle'>Invitation list</div>
      <div className='is-flex-direction-column mt-3'>
        {invitations.map(invite =>
          <div key={invite._id} className='card'>
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
              <div className='button'>Ignore</div>
              <div className='button is-info'>Accept</div>
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