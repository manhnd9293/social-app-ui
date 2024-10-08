import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import utils from "../../../utils/utils";
import {useMutation} from "react-query";
import {beClient} from "../../../config/BeClient";
import PostImage from "./PostImage";

function sendCreateRequest(post) {
  const form = new FormData();
  post.files.forEach(file => {
    form.append('photoFiles', file);
    form.append('captions', '');
  })
  form.append('content', post.content);

  return beClient.post('/post', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.data);
}

function PostCreate({onPosted,onclose}) {
  const [content, setContent] = useState('');
  const [captions, setCaptions] = useState([]);
  const [files, setFiles] = useState([]);
  const user = useSelector(state => state.user);
  const postRef = useRef(null);


  function createPost() {
    const post = {
      content: content.trim(),
      files
    }
    onPosted(post);
  }

  useEffect(() => {
    postRef.current.focus();
    const root = document.getElementsByTagName( 'html' )[0];
    root.className += ' is-clipped';

    return () => {
      root.className = root.className.split(' ').filter(s => s !== 'is-clipped').join(' ')
    }
  }, [])

  return (
    <div className="modal is-active">
      <div className="modal-background"
           style={{opacity: 0.9}}
           onClick={onclose}
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create Post</p>
          <button className="delete"
                  aria-label="close"
                  onClick={onclose}
          ></button>
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
                    rows={3}
                    ref={postRef}
          ></textarea>

          <PostImage setFiles={setFiles} files={files}/>
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