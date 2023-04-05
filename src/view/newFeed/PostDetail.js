import React, {useEffect, useRef, useState} from 'react';
import Post from "./Post/Post";
import {beClient} from "../../config/BeClient";
import {Media} from "../../utils/Constant";
import {useSelector} from "react-redux";
import utils from "../../utils/utils";
import {DateTime} from "luxon";

function PostDetail({post,reactPost,closePostModal}) {
  const commentRef = useRef(null);
  const user = useSelector(state => state.user);
  const [comment, setComment] = useState('');
  const [listComment, setListComment] = useState([]);

  useEffect(() => {
    commentRef.current.focus();
  })

  async function handleKeyDown(e) {
    if (e.key === 'Enter' && comment.length > 0) {
      setComment('');
      await beClient.post('/post/comment', {
        content: comment,
        mediaType: Media.Post,
        mediaId: post._id
      }).then(res => res.data);
      setListComment([
        {
          userId: {
            fullName: user.fullName,
            avatar: user.avatar,
          },
          date: DateTime.now(),
          content: comment,
          totalReaction: [],
          _id: utils.objectId()
        },
        ...listComment
      ])
    }
  }

  useEffect(() => {
    beClient.get(`/post/${post._id}/comments`).then(res => {
      setListComment(res.data);
    })
  },[])

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
          />
          <div style={{marginTop: -12}} className={`has-background-white card`}>
            {
              listComment.length > 0 &&
              listComment.map(comment => (
                <div key={comment._id} className={`mt-1 p-3`}>
                  <article className={`media`}>
                    <figure className={`media-left`}>
                      <p className={`image is-48x48`}>
                        <img src={comment.userId.avatar || utils.defaultAvatar}
                             style={{width: 48, height: 48}}
                             className={`is-rounded`}
                        />
                      </p>
                    </figure>
                    <div className={`media-content`}>
                      <div style={{backgroundColor: '#eeeff1', borderRadius:8, padding: 10}}>
                        <strong>{comment.userId.fullName}</strong>
                        <br/>
                        <span>
                          {comment.content}
                        </span>
                      </div>
                      <div className={`is-flex is-align-items-center`} style={{gap: 10}}>
                        <div className={`is-size-7 has-text-weight-bold is-clickable`}>Like</div>
                        <div className={`is-size-7`}>{utils.showTimeDistanceFromNow(comment.date)}</div>
                      </div>
                    </div>
                  </article>
                </div>
              ))
            }
            <div className={`is-flex is-align-items-center p-2`}>
              <figure className={`is-48x48 image`}>
                <img src={user.avatar || utils.defaultAvatar}
                     style={{width: 48, height: 48}}
                     className={`is-rounded`}/>
              </figure>
              <input className={`input ml-3`}
                     type={`text`}
                     placeholder={'Write a comment'}
                     ref={commentRef}
                     value={comment}
                     onChange={e => setComment(e.target.value)}
                     onKeyDown={handleKeyDown}
              >
              </input>
            </div>

          </div>
        </div>


      </div>
    </div>
  );
}



export default PostDetail;