import React, {useState} from 'react';
import {Outlet, useLoaderData, useNavigate} from "react-router-dom";
import {beClient} from "../../config/BeClient";
import utils from "../../utils/utils";


function ConversationList() {
  const url = new URL(window.location.href);
  const initialConversation = url.pathname.split('/').reverse()[0];

  const navigate = useNavigate();
  const {friends: conversations} = useLoaderData();
  const [currentConversation, setCurrentConversation] = useState(initialConversation);

  const selectConversation = (conversation) => () => {
    const id = conversation.conversationId._id;
    setCurrentConversation(id);
    navigate(`${id}`)
  }

  return (
    <div>
      <div className={`title is-size-4 mt-3`}>Conversations</div>
      <div className='mt-3 columns'>
        <div className='list column is-4'>
          {
            conversations.map(conver => (
              <div className={`list-item is-clickable ${currentConversation === conver.conversationId._id && 'has-background-info-light'}`}
                   key={conver.friendId._id}
                   onClick={selectConversation(conver)}>
                <div className='list-item-image'>
                  <figure className='image is-64x64'>
                    <img src={conver.friendId?.avatar || utils.defaultAvatar}
                         className='is-rounded'
                         style={{width: 64, height:64}}/>
                  </figure>
                </div>

                <div className='list-item-content'>
                  <div className='list-item-title'>{conver.friendId.fullName}</div>
                  <div className='list-item-description'>{conver.conversationId.lastMessageId?.textContent}</div>
                </div>
              </div>
            ))
          }
        </div>
        <Outlet/>
      </div>
    </div>
  );
}

function conversationsLoader() {
  return beClient.get('/conversations').then(res => res.data)
}

export {conversationsLoader}
export default ConversationList;