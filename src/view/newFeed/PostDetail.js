import React, {useEffect, useRef, useState} from 'react';
import Post from "./Post/Post";


function PostDetail({post,reactPost,closePostModal}) {

  useEffect(() => {
    const root = document.getElementsByTagName( 'html' )[0];
    root.className += ' is-clipped';
    return () => {
      root.className = root.className.split(' ').filter(s => s !== 'is-clipped').join(' ')
    };
  }, []);

  return (
    <div className={`modal is-active`} >
      <div className={'modal-background has-background-white-bis'}
           onClick={closePostModal}
           style={{opacity: 0.8}}
      ></div>
      <div className={'modal-card card'}>
        <div className={`modal-card-head`}>
          <p className="modal-card-title has-text-centered">
            <strong>{post.byUser.fullName}'s Post</strong>
          </p>
          <button className="delete" aria-label="close"></button>
        </div>
        <div className={`mt-0`} style={{maxHeight: 600, overflowY: 'scroll'}}>
          <Post postData={post}
                onReaction={reactPost}
                showComments={true}
          />
        </div>
      </div>
    </div>
  );
}



export default PostDetail;