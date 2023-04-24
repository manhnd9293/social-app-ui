import {useSelector} from "react-redux";
import React, {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../rootLayout/RootLayout";
import {beClient} from "../../../config/BeClient";
import {Relation, SocketEvent} from "../../../utils/Constant";
import FriendOptions from "../../friend/FriendOptions";
import RelationOptions from "./RelationOptions";

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

export default RelationManagement;