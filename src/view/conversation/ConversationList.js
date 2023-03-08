import React, {useState} from 'react';
import {Link, useLoaderData} from "react-router-dom";
import {beClient} from "../../config/BeClient";
import utils from "../../utils/utils";

function ConversationList() {
  const [currentConversation, setCurrentConversation] = useState(null);
  const {friends} = useLoaderData();
  return (
    <div>
      <div className={`title is-size-4 mt-3`}>Conversations</div>
      <div className='mt-3 columns'>
        <div className='list column is-4'>
          {
            friends.map(friend => (
              <div className={`list-item is-clickable ${currentConversation?.friendId?._id === friend.friendId._id && 'has-background-info-light'}`}
                   key={friend.friendId._id}
                   onClick={() => setCurrentConversation(friend)}>
                <div className='list-item-image'>
                  <figure className='image is-64x64'>
                    <img src={friend.friendId?.avatar || utils.defaultAvatar}
                         className='is-rounded'
                         style={{width: 64, height:64}}/>
                  </figure>
                </div>

                <div className='list-item-content'>
                  <div className='list-item-title'>{friend.friendId.fullName}</div>
                  <div className='list-item-description'>{friend.conversationId.lastMessageId?.textContent}</div>
                </div>
              </div>
            ))
          }
        </div>
        <div className={`column`}>
          {
            currentConversation &&

            <article className={`media`}>
              <figure className={`media-left`}>
                <p className={`image is-64x64`}>
                  <img className={`is-rounded`}
                       src={currentConversation?.friendId?.avatar || utils.defaultAvatar}
                       style={{width: 64, height: 64}}
                  />
                </p>
              </figure>
              <div className={`media-content`}>
                <Link to={`/profile/${currentConversation.friendId._id}`}>
                  <strong className='title is-size-5'>{utils.upperCaseFirst(currentConversation.friendId.fullName)}</strong>
                </Link>
              </div>
            </article>
          }
        </div>
      </div>
    </div>
  );
}

function conversationsLoader() {
  return beClient.get('/conversations').then(res => res.data)
}

export {conversationsLoader}

export default ConversationList;