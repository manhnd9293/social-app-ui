import React, {useContext, useEffect, useRef, useState} from 'react';
import utils from "../../utils/utils";
import {Link, Outlet, useLoaderData} from "react-router-dom";
import {beClient} from "../../config/BeClient";
import {useSelector} from "react-redux";
import  classes from './chat.module.scss';
import {SocketContext} from "../rootLayout/RootLayout";
import {SocketEvent} from "../../utils/Constant";

function ChatFrame() {
  const [conversation, initialMessage] = useLoaderData();
  const user = useSelector(state => state.user);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState(initialMessage);
  const [reachEndChat, setReachEndChat] = useState(true);
  const endChatDiv = useRef();
  const chatContainer = useRef(null);


  const socket = useContext(SocketContext);

  conversation.friend = conversation.participants.find(p => p._id !== user._id);

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
  }, [initialMessage]);


  useEffect(() => {
    if(!socket) return;

    socket.on(SocketEvent.MessageReceived, (newMessage) => {

      if(newMessage.conversationId !== conversation._id) return;

      setMessages((messages) => [...messages, newMessage])
    })

    return () => {
      socket.off(SocketEvent.MessageReceived);
    };
  }, [socket, conversation]);

  const handleSubmitFromInput = (e) => {
    if(e.key !== 'Enter' || !currentMessage) return;

    const messageData = {
      conversationId: conversation._id,
      date: Date.now(),
      from: user._id,
      textContent: currentMessage
    }
    setMessages([...messages, {...messageData, _id: utils.objectId()}]);

    socket.emit(SocketEvent.MessageSent, messageData);
    setCurrentMessage('');
  }

  return (
    <div className={`column`}>
      {
        conversation &&
        <div>
          <article className={`media`}>
            <figure className={`media-left`}>
              <p className={`image is-64x64`}>
                <img className={`is-rounded`}
                     src={conversation?.friend?.avatar || utils.defaultAvatar}
                     style={{width: 64, height: 64}}
                />
              </p>
            </figure>
            <div className={`media-content`} >
              <Link to={`/profile/${conversation.friend._id}`}>
                <strong
                  className='title is-size-5'>{utils.upperCaseFirst(conversation.friend.fullName)}</strong>
              </Link>
            </div>
          </article>

          <div className={`mt-3 ${classes.chatContainer}`}
               ref={chatContainer}
          >
            {messages.map(m =>(
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
            <div ref={endChatDiv}></div>
          </div>
          <div className={`field has-addons`}>
            <div className={`control is-expanded`}>
              <input className={`input`}
                     type={'text'}
                     placeholder={'Type your message'}
                     onKeyDown={handleSubmitFromInput}
                     onChange={e => setCurrentMessage(e.target.value)}
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
  const conversation =  beClient.get(`/conversations/${id}`).then(res => res.data)
  const messages =  beClient.get(`/conversations/${id}/messages`).then(res => res.data)
  return Promise.all([conversation, messages]);
}

export {messageLoader}

export default ChatFrame;