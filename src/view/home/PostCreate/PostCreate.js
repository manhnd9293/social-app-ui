import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import utils from "../../../utils/utils";
import {useMutation} from "react-query";
import {beClient} from "../../../config/BeClient";

function sendCreateRequest(post) {
  return beClient.post('/post', post).then(res => res.data);
}

function PostCreate({onPosted,onclose}) {
  const [content, setContent] = useState('');
  const user = useSelector(state => state.user);
  const postRef = useRef(null);
  const {mutate, isLoading, error} = useMutation(sendCreateRequest, {
    onSuccess: () => {
      onPosted();
    }
  });
  function createPost() {
    const post = {
      content: content.trim(),
    }
    mutate(post)
  }

  useEffect(() => {
    postRef.current.focus();
    document.body.style.overflow = 'hidden';
  }, [])

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onclose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create Post</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className={`columns`}>
            <div className={`column is-1`}>
              <figure className="image is-48x48">
                <img src={user.avatar || utils.defaultAvatar} style={{width: 48, height: 48}} className='is-rounded' alt="Placeholder image"/>
              </figure>
            </div>
            <div className={`column`}>
              <span className={`subtitle ml-2`}>{user.fullName}</span>
            </div>
          </div>
          <textarea className={'textarea'}
                    placeholder={`what's on your mind, ${user.fullName} ?`}
                    value={content}
                    onChange={event => setContent(event.target.value)}
                    ref={postRef}
          ></textarea>
        </section>
        <footer className="modal-card-foot">
          <button className={`button is-info`}
                  disabled={content.trim().length === 0}
                  onClick={createPost}
          >Post</button>
        </footer>
      </div>
    </div>
  );
}

export default PostCreate;