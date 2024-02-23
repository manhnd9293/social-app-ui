import React, {useEffect, useRef, useState} from 'react';
import utils from "../../../utils/utils";
import {useSelector} from "react-redux";
import classes from "./post.module.scss";
import {Link} from "react-router-dom";
import PostComments from "./PostComments";
import CurrentReaction from "./CurrentReaction";
import PhotoPosts from "./PhotoPosts";
import {ListReaction} from "../../../utils/Constant";
import PostInteractData from "./PostInteractionData";

function Post({postData, onReaction, onCommentClick, showComments, updateTotalComment}) {
  const {byUser, comments, content, date, totalReaction, reaction, _id, photo, photoPosts} = postData;
  const user = useSelector(state => state.user);
  const [showReaction, setShowReaction] = useState(false);
  const [hoveEmoji, setHoveEmoji] = useState(null);
  const timeOutRef = useRef(null);
  const reactionListRef = useRef(null);

  useEffect(() => {
    const hideReactionOptions = (e) => {
      if (reactionListRef.current && !reactionListRef.current.contains(e.target)) {
        setShowReaction(false);
      }
    }
    document.addEventListener('mousedown', hideReactionOptions)
    return () => {
      document.removeEventListener('mousedown', hideReactionOptions);
    };
  }, []);

  const showListReaction = (e) => {
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      setShowReaction(true);
    }, 600)
  };

  const hideListReaction = (e) => {
    clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      setShowReaction(false);
    }, 800)
  };

  function reactPost(reactionType) {
    onReaction({postId: _id, reactionType});
  }


  const onUpdateTotalComment = (postId, newTotalComment) => {
    updateTotalComment(postId, newTotalComment)
  };
  return (
    <div className={`card p-3`}>
      <div className={`columns`}>
        <div className={`column is-1`}>
          <figure className="image is-48x48">
            <img className={`is-rounded`} style={{width: 48, height: 48}} src={byUser.avatar || utils.defaultAvatar}/>
          </figure>
        </div>

        <div className={`column ml-2 is-3`}>
          <Link to={`/profile/${byUser._id}`} style={{color: 'black'}}>
            <span className={`is-size-6 has-text-weight-bold`}>{utils.upperCaseFirst(byUser.fullName)}</span>
          </Link>
          <div className={`is-size-7`}>{utils.showTimeDistanceFromNow(date)}</div>
        </div>
      </div>
      <div style={{marginTop: -10}}>
        {content}
      </div>

      <PhotoPosts photoPosts={photoPosts}/>
      {photo && <div className={`mt-3 mb-2 is-clickable`}
                     style={{...utils.getStyleForImageBackground(photo), height: 420}}></div>}

      <div style={{height: 1, backgroundColor: '#dcdbdb'}} className={`mt-3 mb-3`}/>

      <PostInteractData totalReaction={totalReaction}
                        comments={comments}
      />
      {(totalReaction.length > 0 || comments > 0) && <div style={{height: 1, backgroundColor: '#dcdbdb'}} className={`mt-2`}/>}
      <div className={`columns mt-1`} style={{position: 'relative'}}>
        <CurrentReaction hideListReaction={hideListReaction}
                         showListReaction={showListReaction}
                         reaction={reaction}
                         reactPost={reactPost}
                         ref={timeOutRef}
        />
        <div className={`column is-flex is-justify-content-center is-align-items-center`}>
          <button className={`button is-white`}
                  onClick={e => onCommentClick && onCommentClick(postData)}
          >
            <span className={`icon`}>
            <i className="fa-regular fa-comment"></i>
            </span>
            <span>Comment</span>
          </button>
        </div>
        {
          user._id !== byUser._id &&
          <div
            className={`column is-flex is-justify-content-center is-align-items-center`}>
            <button className={`button is-white`}><span className={`icon`}>
              <i className="fa-regular fa-share-from-square"/>
            </span>
              <span>Share</span></button>
          </div>
        }
        {
          showReaction &&
          <div style={{position: 'absolute', zIndex: 100, top: -30}}
               ref={reactionListRef}
          >
            <div
              className={`card is-size-4 is-flex is-justify-content-center is-align-items-flex-end is-flex-wrap-nowrap`}
              style={{height: 35, width: 275}}>
              {
                ListReaction.map((reaction) =>
                  <div key={reaction.value}
                       className={`is-flex is-flex-direction-column m-0 is-align-items-center is-flex-shrink-1 is-flex-grow-1`}>
                    {hoveEmoji === reaction.value &&
                      <div key={reaction.value + '-'}
                           className={`has-background-dark p-1 has-text-white is-size-6 has-text-centered`}
                           style={{borderRadius: '10px'}}
                      >{hoveEmoji}</div>
                    }

                    <div className={`px-1 is-clickable is-hoverable ${classes.emoji}`}
                         style={{animationDelay: `${10}ms`, width: '100%'}}
                         onMouseEnter={(e) => {
                           setHoveEmoji(reaction.value);
                           e.target.style.removeProperty('animation-delay');
                           e.target.classList.remove(classes.emoji)
                           e.target.classList.remove(classes.downEmo)
                           e.target.classList.add(classes.upEmo)
                         }}
                         onMouseLeave={(e) => {
                           setHoveEmoji(null);
                           e.target.classList.remove(classes.upEmo)
                           e.target.classList.add(classes.downEmo)
                         }}
                         onMouseOver={showListReaction}
                         onMouseOut={hideListReaction}
                         onClick={() => {
                           reactPost(reaction.value);
                           clearTimeout(timeOutRef.current);
                           setShowReaction(false);
                         }}
                    >{reaction.label}
                    </div>
                  </div>
                )}
            </div>
          </div>
        }

      </div>

      {showComments && <PostComments post={postData}
                                     onUpdateTotalComment={onUpdateTotalComment}
      />}
    </div>
  );
}

export default Post;