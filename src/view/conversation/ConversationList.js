import React, {createContext, useContext, useEffect, useState} from 'react';
import {Outlet, redirect, useLoaderData, useNavigate} from "react-router-dom";
import {beClient} from "../../config/BeClient";
import utils from "../../utils/utils";
import {SocketContext} from "../rootLayout/RootLayout";
import {OnlineState, SocketEvent} from "../../utils/Constant";
import {useDispatch, useSelector} from "react-redux";
import classes from './chat.module.scss';
import {conversationActions} from "../../store/ConversationSlice";
import store from "../../store";

const CurrentConversationCtx = createContext(null);

function ConversationList() {
  const url = new URL(window.location.href);
  const initialConversationId = url.pathname.split('/').reverse()[0];
  const socket = useContext(SocketContext);

  const navigate = useNavigate();
  const {friends: initConversations} = useLoaderData();
  const [conversations, setConversations] = useState(initConversations);
  const [currentConversation, setCurrentConversation] =
    useState(initConversations.find(con => con.conversationId._id === initialConversationId));
  const user = useSelector(state => state.user);
  const conversationStateStore = useSelector(state => state.conversation);

  useEffect(() => {
    if (!socket) return;

    const showTyping = (data) => {
      const clone = structuredClone(conversations);
      const typingConv = clone.find(c => c.conversationId._id === data.conversationId);
      // debugger
      typingConv.typing = true;
      setConversations(clone)
    }

    const hideTyping = (data) => {
      const clone = structuredClone(conversations);
      const typingConv = clone.find(c => c.conversationId._id === data.conversationId);
      typingConv.typing = false;
      setConversations(clone)
    }

    const updateOnlineState = (data) => {
      const {userId, state} = data;
      const clone = structuredClone(conversations);
      const updateOnlineStateFriend = clone.find(c => c.friendId._id === userId);
      // debugger
      updateOnlineStateFriend.friendId.onlineState = state;
      setConversations(clone);
    };

    socket.on(SocketEvent.MessageReceived, moveConversationToTop);
    socket.on(SocketEvent.Typing, showTyping);
    socket.on(SocketEvent.EndTyping, hideTyping);
    socket.on(SocketEvent.UpdateOnlineState, updateOnlineState);

    return () => {
      socket.off(SocketEvent.MessageReceived, moveConversationToTop);
      socket.off(SocketEvent.Typing, showTyping);
      socket.off(SocketEvent.EndTyping, hideTyping);
      socket.off(SocketEvent.UpdateOnlineState, updateOnlineState);
    }
  }, [socket, conversations]);


  const selectConversation = (conversation) => () => {
    const id = conversation.conversationId._id;
    setCurrentConversation(conversation);
    navigate(`${id}`)
  }


  const moveConversationToTop = (message) => {
    const {conversationId} = message;
    const latestConversation = conversations.find(con => con.conversationId._id === conversationId);
    const restConversations = conversations.filter(con => con.conversationId._id !== conversationId);
    latestConversation.conversationId.lastMessageId = {
      from: message.from._id || message.from, //handle case data from socket vs data from ui when chat
      textContent: message.textContent,
      _id: message._id
    }
    // debugger
    setConversations([latestConversation, ...restConversations]);
  };


  return (
    <div>
      <div className={`title is-size-4 mt-3`}>Conversations</div>
      <div className='mt-3 columns has-background-white block'>
        <div className='list column is-4 has-overflow-ellipsis'>
          <div className={'mb-4'}>
            <input className={'input is-small'} type={'text'} placeholder={'Search messages'}/>
          </div>

          <div style={{height: '500px', overflowY: 'scroll'}}>
            {
              conversations.map(con => {
                const person = `${con.conversationId.lastMessageId.from !== user._id ? utils.upperCaseFirst(con.friendId.fullName) : 'You'}`;
                const lastMessage = `${con.conversationId.lastMessageId?.textContent}`;
                const description = con.typing ? (con.friendId.fullName + ' is typing...') : (person + ': ' + lastMessage)
                return (
                  <div
                    className={`is-flex-grow-1 list-item is-clickable ${currentConversation.conversationId._id === con.conversationId._id && 'has-background-info-light'}`}
                    key={con.conversationId._id}
                    onClick={selectConversation(con)}>
                    <div className='list-item-image is-flex'>
                      <figure className='image is-64x64'>
                        <img src={con.friendId?.avatar || utils.defaultAvatar}
                             className='is-rounded'
                             style={{width: 64, height: 64}}/>
                      </figure>
                      {
                        <div className={`
                              ${con.friendId.onlineState === OnlineState.Online ? '' : 'is-invisible'} 
                              ${classes.onlineSignal}`}
                             style={{position: 'relative', top: 50, left: -10}}></div>}
                    </div>

                    <div className='list-item-content'>
                      <div className='list-item-title is-flex is-align-items-center'>
                        {con.friendId.fullName}
                      </div>
                      <div className={`list-item-description ${con.typing && 'is-italic has-text-link'}`}
                      >
                        {description}
                      </div>
                    </div>
                    {
                      conversationStateStore?.unreadMessagesDetail?.[con.conversationId._id] > 0 &&
                        <span className='has-background-info-dark has-text-white ml-2 is-flex is-align-items-center is-justify-content-center'
                              style={{borderRadius: '100%', width: 20, height: 20 , padding: 5, backgroundColor: 'green'}}>
                            <span className={'has-text-weight-bold'}>
                              {conversationStateStore?.unreadMessagesDetail[con.conversationId._id] < 100 ?
                                conversationStateStore?.unreadMessagesDetail[con.conversationId._id]
                                : '99+'}
                            </span>
                        </span>
                    }
                  </div>

                );
              })
            }
          </div>
        </div>
        <CurrentConversationCtx.Provider value={{moveConversationToTop, currentConversation}}>
          <Outlet/>
        </CurrentConversationCtx.Provider>
      </div>
    </div>
  );
}

async function conversationsLoader({params}) {
  const {id} = {...params};
  const list = await beClient.get('/conversations').then(res => {
    const conversations = res.data.friends;
    const detail = conversations.reduce((result, current) => {
      result[current.conversationId._id] = current.conversationId.unReadMessages;
      return result;
    }, {});
    store.dispatch(conversationActions.setUnreadMessageDetail(
      {unreadMessagesDetail: detail}
    ))
    return res.data;
  });
  const firstConId = list.friends[0]?.conversationId._id;


  if (!id && firstConId) {
    return redirect(`/conversations/${firstConId}`);
  } else {
    return list;
  }
}

export {conversationsLoader, CurrentConversationCtx}
export default ConversationList;