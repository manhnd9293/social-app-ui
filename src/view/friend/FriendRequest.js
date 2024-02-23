import React from 'react';
import {beClient} from "../../config/BeClient";
import {Link} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import {FriendRequestState} from "../../utils/Constant";
import utils from "../../utils/utils";

function FriendRequest() {
  // const sentRequests = useLoaderData();
  const {data, isLoading, isFetching,refetch, error} = useQuery('sentRequests', loadSentRequests);
  const {mutate, isLoading: removing, error: removeError} = useMutation(removeRequest, {
    onSuccess: () => {
      refetch();
    }
  });

  function handleRemoveRequest(id) {
    mutate(id);
  }

  if(isLoading) return <div>Loading...</div>
  return (
    <div>
      <div className='subtitle'>Sent requests list</div>
      {data && data.map(sendRequest =>
        <div key={sendRequest._id} className='card mt-5'>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={sendRequest.to.avatar || utils.defaultAvatar} className='is-rounded' alt="Placeholder image"/>
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
            <div className='button is-rounded is-small'
                 onClick={() => handleRemoveRequest(sendRequest._id)}
            >Cancel Request</div>
          </div>
        </div>)}
    </div>
  );
}

function loadSentRequests() {
  return beClient.get(`/user/sent-requests`).then(res => res.data);
}

function removeRequest(id) {
  return beClient.patch(`/request/state`, {
    state: FriendRequestState.Cancel,
    requestId: id
  }).then(res => res.data);
}

export {loadSentRequests};

export default FriendRequest;