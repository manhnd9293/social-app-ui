import React, {useContext, useEffect, useRef, useState} from 'react';
import utils from "../../utils/utils";
import {Link, useLoaderData} from "react-router-dom";
import {beClient} from "../../config/BeClient";
import {useSelector} from "react-redux";
import classes from './chat.module.scss';
import {SocketContext} from "../rootLayout/RootLayout";
import {OnlineState, SocketEvent} from "../../utils/Constant";
import {CurrentConversationCtx} from "./ConversationList";

function ChatFrame() {
  const [conversation, initialMessage] = useLoaderData();
  const user = useSelector(state => state.user);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState(initialMessage);
  const [reachEndChat, setReachEndChat] = useState(true);
  const [typing, setTyping] = useState(false);
  const endChatDiv = useRef();
  const chatContainer = useRef(null);
  const {moveConversationToTop} = useContext(CurrentConversationCtx);
  const isTypingRef = useRef({});


  conversation.friend = conversation.participants.find(p => p._id !== user._id);
  const [onlineState, setOnlineState] = useState(conversation.friend.onlineState);

  const socket = useContext(SocketContext);

  useEffect(() => {
    chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    const observer = new IntersectionObserver(entries => {
      const enChat = entries[0];
      if (enChat.isIntersecting) {
        setReachEndChat(true);
      } else {
        setReachEndChat(false);
      }
    });

    observer.observe(endChatDiv.current);

    return () => {
      if (endChatDiv.current) {
        observer.unobserve(endChatDiv.current);
      }
    };
  }, [messages]);


  useEffect(() => {
    setMessages(initialMessage);
    setOnlineState(conversation.friend.onlineState);
  }, [initialMessage]);


  useEffect(() => {
    if (!socket) return;

    const updateMessage = (newMessage) => {
      if (newMessage.conversationId !== conversation._id) return;

      setMessages((messages) => [...messages, newMessage])
    };

    const showTyping = data => {
      if(data.conversationId !== conversation._id) return;
      setTyping(true);
    }

    const hideTyping = data => {
      setTyping(false);
    }

    const updateOnlineState = (data) => {
      const {userId, state} = data;
      if(userId !== conversation.friend._id) return;
      setOnlineState(state);
    };

    socket.on(SocketEvent.MessageReceived, updateMessage);
    socket.on(SocketEvent.Typing, showTyping);
    socket.on(SocketEvent.EndTyping, hideTyping)
    socket.on(SocketEvent.UpdateOnlineState, updateOnlineState);

    return () => {
      socket.off(SocketEvent.MessageReceived, updateMessage);
      socket.off(SocketEvent.Typing, showTyping);
      socket.off(SocketEvent.EndTyping, hideTyping);
      socket.off(SocketEvent.UpdateOnlineState, updateOnlineState);
      setTyping(false);
    };
  }, [socket, conversation]);

  const handleSubmitFromInput = (e) => {
    if (e.key !== 'Enter' || !currentMessage) return;

    const messageData = {
      conversationId: conversation._id,
      date: Date.now(),
      from: user._id,
      textContent: currentMessage
    }
    setMessages([...messages, {...messageData, _id: utils.objectId()}]);

    socket.emit(SocketEvent.MessageSent, messageData);
    setCurrentMessage('');
    moveConversationToTop(messageData);
  }
  const onChangeMessageInput = e => {
    setCurrentMessage(e.target.value);
    if(isTypingRef.current?.state){
      clearTimeout(isTypingRef.current.timeout);
    } else {
      isTypingRef.current.state = true
      socket.emit(SocketEvent.Typing, {
        user: {
          _id: user._id,
          fullName: user.fullName,
        },
        conversationId: conversation._id
      })
    }
    isTypingRef.current.timeout = setTimeout(() => {
      socket.emit(SocketEvent.EndTyping, {
        user: {
          _id: user._id,
          fullName: user.fullName,
        },
        conversationId: conversation._id
      });
      isTypingRef.current.state = false;
    }, 500);
  }

  return (
    <div className={`column`}>
      {
        conversation &&
        <div>
          <article className={`media`}>
            <figure className={`media-left`}>
              <div className={`image is-64x64`}>
                <img className={`is-rounded`}
                     src={conversation?.friend?.avatar || utils.defaultAvatar}
                     style={{width: 64, height: 64}}
                />
                <div className={`${classes.onlineSignal} ${onlineState === OnlineState.Online ? '' : 'is-invisible'}`}
                     style={{position:'relative', right: -55, top: -10}}

                ></div>
              </div>
            </figure>
            <div className={`media-content`}>
              <Link to={`/profile/${conversation.friend._id}`}>
                <strong
                  className='title is-size-5'>{utils.upperCaseFirst(conversation.friend.fullName)}</strong>
              </Link>
            </div>
          </article>

          <div className={`mt-3 ${classes.chatContainer}`}
               ref={chatContainer}
          >
            {messages.map(m => (
              <div key={m._id}
                   className={
                     `${(m.from._id === user._id || m.from === user._id) ? classes.ownMessage : classes.otherMessage}
                mb-1
                `
                   }
              >
                <div className={`${classes.message} `}>{m.textContent}</div>
              </div>
            ))}
            <div className={`${classes.otherMessage} ${!typing && 'is-invisible'}`} >
              <span className={`is-italic has-text-link`}>{`${conversation.friend.fullName} is typing...`}</span>
            </div>
            <div ref={endChatDiv}></div>
          </div>
          <div className={`field has-addons mt-3`}>
            <div className={`control is-expanded`}>
              <input className={`input`}
                     type={'text'}
                     placeholder={'Type your message'}
                     onKeyDown={handleSubmitFromInput}
                     onChange={onChangeMessageInput}
                     value={currentMessage}
              />
            </div>
            <div className={'control'}>
              <button className={'button is-info'}>Send</button>
            </div>
          </div>
        </div>
      }

    </div>
  );
}

function messageLoader({params}) {
  const {id} = params;
  const conversation = beClient.get(`/conversations/${id}`).then(res => res.data)
  const messages = beClient.get(`/conversations/${id}/messages`).then(res => res.data)
  return Promise.all([conversation, messages]);
}

export {messageLoader}

export default ChatFrame;