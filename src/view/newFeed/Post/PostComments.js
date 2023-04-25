import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {beClient} from "../../../config/BeClient";
import utils from "../../../utils/utils";
import postService from "../../../services/PostService";
import {DateTime} from "luxon";

function PostComments({post, onUpdateTotalComment}) {
  const [comment, setComment] = useState('');
  const user = useSelector(state => state.user);

  const [listComment, setListComment] = useState([]);
  const commentRef = useRef(null);
  const postRef = useRef(null);

  useEffect(() => {
    commentRef.current.focus();
  }, []);

  async function handleKeyDown(e) {
    if (e.key === 'Enter' && comment.length > 0) {
      setComment('');

      const response = await postService.comment({postId: post._id, comment})
        .then(res => res.data);
      setListComment([
        ...listComment,
        // response.newComment
        {
          userId: {
            fullName: user.fullName,
            avatar: user.avatar,
          },
          date: DateTime.now(),
          content: comment,
          totalReaction: [],
          _id: utils.objectId()
        }
      ])

      onUpdateTotalComment(post._id, listComment.length + 1);
      if(postRef.current) {
        postRef.current.scrollTop = postRef.current.scrollHeight;
      }
    }
  }

  useEffect(() => {
    beClient.get(`/post/${post._id}/comments`).then(res => {
      setListComment(res.data);
    })
  },[])

  return (
    <div style={{marginTop: -12, position: 'relative'}}
         className={`has-background-white`}
         ref={postRef}
    >
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
      <div className={`is-flex is-align-items-center p-2 block has-background-white`}
           style={{position: 'sticky', bottom: 0, zIndex: 99}}>
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
  )
}

export default PostComments;