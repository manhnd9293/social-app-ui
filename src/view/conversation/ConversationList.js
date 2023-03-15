import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {Outlet, redirect, useLoaderData, useNavigate} from "react-router-dom";
import {beClient} from "../../config/BeClient";
import utils from "../../utils/utils";
import {SocketContext} from "../rootLayout/RootLayout";
import {SocketEvent} from "../../utils/Constant";


const CurrentConversationCtx = createContext(null);
function ConversationList() {
  const url = new URL(window.location.href);
  const initialConversation = url.pathname.split('/').reverse()[0];
  const socket = useContext(SocketContext);

  const navigate = useNavigate();
  const {friends: initConversations} = useLoaderData();
  const [conversations, setConversations] = useState(initConversations);
  const [currentConversation, setCurrentConversation] = useState(initialConversation);


  useEffect(() => {
    if (!socket) return;
    socket.on(SocketEvent.MessageReceived, moveConversationToTop)
    return () => {
      socket.off(SocketEvent.MessageReceived, moveConversationToTop);
    }
  }, [socket, conversations]);

  const selectConversation = (conversation) => () => {
    const id = conversation.conversationId._id;
    setCurrentConversation(id);
    navigate(`${id}`)
  }


  const moveConversationToTop = (message) => {
    const {conversationId} = message;
    const latestConversation = conversations.find(con => con.conversationId._id === conversationId);
    const restConversations = conversations.filter(con => con.conversationId._id !== conversationId);
    latestConversation.conversationId.lastMessageId = {
      from: message.from._id,
      textContent: message.textContent,
      _id: message._id
    }
    setConversations([latestConversation, ...restConversations]);
  };


  return (
    <div>
      <div className={`title is-size-4 mt-3`}>Conversations</div>
      <div className='mt-3 columns' >
        <div className='list column is-4' >
          <div className={'mb-4'}>
            <input className={'input is-small'} type={'text'} placeholder={'Search messages'}/>
          </div>

          <div style={{height: '500px', overflowY: 'scroll'}}>
            {
            conversations.map(con => (
              <div
                className={`list-item is-clickable ${currentConversation === con.conversationId._id && 'has-background-info-light'}`}
                key={con.conversationId._id}
                onClick={selectConversation(con)}>
                <div className='list-item-image'>
                  <figure className='image is-64x64'>
                    <img src={con.friendId?.avatar || utils.defaultAvatar}
                         className='is-rounded'
                         style={{width: 64, height: 64}}/>
                  </figure>
                </div>

                <div className='list-item-content'>
                  <div className='list-item-title'>{con.friendId.fullName}</div>
                  <div className='list-item-description'>{con.conversationId.lastMessageId?.textContent}</div>
                </div>
              </div>
            ))
          }
          </div>
        </div>
        <CurrentConversationCtx.Provider value={moveConversationToTop}>
          <Outlet/>
        </CurrentConversationCtx.Provider>
      </div>
    </div>
  );
}

async function conversationsLoader({params}) {
  const list = await beClient.get('/conversations').then(res => res.data);
  const firstConId = list.friends[0]?.conversationId._id;

  const {id} = {...params};

  if(!id && firstConId) {
    return redirect(`/conversations/${firstConId}`);
  } else {
    return list;
  }

}

export {conversationsLoader, CurrentConversationCtx}
export default ConversationList;