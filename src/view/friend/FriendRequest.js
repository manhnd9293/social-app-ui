import React from 'react';
import {beClient} from "../../config/BeClient";
import {Link, useLoaderData} from "react-router-dom";

function FriendRequest(props) {
  const sentRequests = useLoaderData();
  return (
    <div>
      <div className='subtitle'>Sent requests list</div>
      {sentRequests.map(sendRequest =>
        <div key={sendRequest._id} className='card mt-5'>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={sendRequest.to.avatar} className='is-rounded' alt="Placeholder image"/>
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-5">
                  <Link to={`/profile/${sendRequest.to._id}`}>
                    {sendRequest.to.fullName}
                  </Link>
                </p>
                <p className="subtitle is-6">{sendRequest.message}</p>
              </div>
            </div>
          </div>
          <div className='card-footer buttons p-3'>
            <div className='button is-rounded is-small'>Cancel Request</div>
          </div>
        </div>)}
    </div>
  );
}

function loadSentRequests() {
  return beClient.get(`/user/sent-requests`).then(res => res.data);
}

export {loadSentRequests};

export default FriendRequest;