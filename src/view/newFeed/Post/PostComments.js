import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {beClient} from "../../../config/BeClient";
import {Media} from "../../../utils/Constant";
import {DateTime} from "luxon";
import utils from "../../../utils/utils";

function PostComments({post}) {
  const [comment, setComment] = useState('');
  const user = useSelector(state => state.user);

  const [listComment, setListComment] = useState([]);
  const commentRef = useRef(null);

  useEffect(() => {
    commentRef.current.focus();
  }, []);

  async function handleKeyDown(e) {
    if (e.key === 'Enter' && comment.length > 0) {
      setComment('');
      await beClient.post('/post/comment', {
        content: comment,
        mediaType: Media.Post,
        mediaId: post._id
      }).then(res => res.data);
      setListComment([
        ...listComment,
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
    }
  }

  useEffect(() => {
    beClient.get(`/post/${post._id}/comments`).then(res => {
      setListComment(res.data);
    })
  },[])

  return (
    <div style={{marginTop: -12}} className={`has-background-white`}>
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
  )
}

export default PostComments;