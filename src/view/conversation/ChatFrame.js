import React from 'react';
import utils from "../../utils/utils";
import {Link, Outlet, useLoaderData} from "react-router-dom";
import {beClient} from "../../config/BeClient";
import {useSelector} from "react-redux";

function ChatFrame() {
  const [conversation, messages] = useLoaderData();
  const user = useSelector(state => state.user);
  conversation.friend = conversation.participants.find(p => p._id !== user._id);
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
            <div className={`media-content`}>
              <Link to={`/profile/${conversation.friend._id}`}>
                <strong
                  className='title is-size-5'>{utils.upperCaseFirst(conversation.friend.fullName)}</strong>
              </Link>
            </div>
          </article>

          <div>
            {messages.map(m =>(
              <div key={m._id}> {m.textContent} </div>
            ))}
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