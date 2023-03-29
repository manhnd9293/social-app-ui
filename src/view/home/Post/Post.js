import React, {useEffect, useRef, useState} from 'react';
import utils from "../../../utils/utils";
import {useSelector} from "react-redux";
import classes from "./post.module.scss";
import {Link} from "react-router-dom";
import {Reaction} from "../../../utils/Constant";

function Post({postData, onReaction}) {
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


  return (
    <div className={`card p-3 mt-3`}>
      <div className={`columns`}>
        <div className={`column is-1`}>
          <figure className="image is-48x48">
            <img className={`is-rounded`} style={{width: 48, height: 48}} src={byUser.avatar || utils.defaultAvatar}/>
          </figure>
        </div>

        <div className={`column ml-2`}>
          <Link to={`/profile/${byUser._id}`} style={{color: 'black'}}>
            <div className={`is-size-6 has-text-weight-bold`}>{utils.upperCaseFirst(byUser.fullName)}</div>
            <div className={`is-size-7`}>{utils.showTimeDistanceFromNow(date)}</div>
          </Link>
        </div>
      </div>
      <div style={{marginTop: -10}}>
        {content}
      </div>

      <PhotoPosts photoPosts={photoPosts}/>
      {photo && <div className={`mt-3 mb-2 is-clickable`}
                     style={{...utils.getStyleForImageBackground(photo), height: 450}}></div>}


      <PostInteractData totalReaction={totalReaction}/>
      {
        showReaction &&
        <div style={{position: 'absolute', zIndex: 100, bottom: 50}}
             ref={reactionListRef}
        >
          <div
            className={`card is-size-4 is-flex is-justify-content-center is-align-items-flex-end is-flex-wrap-nowrap`}
            style={{height: 35, width: 275}}>
            {
              listReaction.map((reaction, index) =>
                <div
                  className={`is-flex is-flex-direction-column m-0 is-align-items-center is-flex-shrink-1 is-flex-grow-1`}>
                  {hoveEmoji === reaction.value &&
                    <div key={reaction.value + '-'}
                         className={`has-background-dark p-1 has-text-white is-size-6 has-text-centered`}
                         style={{borderRadius: '10px'}}
                    >{hoveEmoji}</div>
                  }

                  <div key={reaction.value}
                       className={`px-1 is-clickable is-hoverable ${classes.emoji}`}
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
      {
        <div className={`columns mt-1`}>
          <CurrentReaction hideListReaction={hideListReaction}
                           showListReaction={showListReaction}
                           reaction={reaction}
                           reactPost={reactPost}
                           ref={timeOutRef}
          />
          <div
            className={`column is-flex is-justify-content-center is-align-items-center`}>
            <button className={`button is-white`}><span className={`icon`}>
              <i className="fa-regular fa-comment"></i>
            </span>
              <span>Comment</span></button>
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
        </div>
      }
    </div>
  );
}

function PhotoPosts({photoPosts}) {
  if (!photoPosts || photoPosts.length === 0) {
    return null;
  }

  if (photoPosts.length === 2) {
    return (
      <div>
        {
          photoPosts.map(post =>
            <div key={post._id}
                 style={{...utils.getStyleForImageBackground(post.url), height: 250}}
                 className={`mt-1 is-clickable`}
            ></div>
          )
        }
      </div>
    );
  }

  if (photoPosts.length === 3) {
    return (
      <div>
        <div style={{
          ...utils.getStyleForImageBackground(photoPosts[0].url),
          height: 300
        }}></div>
        <div className={`columns mt-1 px-3 mb-2 is-4`}>
          {[photoPosts[1], photoPosts[2]].map(post =>
            <div style={{
              ...utils.getStyleForImageBackground(post.url),
              height: 300
            }}
                 className={`column`}
                 key={post._id}
            ></div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{
        ...utils.getStyleForImageBackground(photoPosts[0].url),
        height: 300
      }}
           className={`is-clickable mt-3`}
      ></div>
      <div className={`is-flex mt-1 mb-2 `} style={{gap: 4}}>
        {[photoPosts[1], photoPosts[2], photoPosts[3]].map(post =>
          <div style={{
            ...utils.getStyleForImageBackground(post.url),
            height: 180
          }}
               className={`column is-clickable`}
               key={post._id}
          ></div>
        )}
      </div>

    </div>
  )
}

const listReaction = [
  {
    label: '👍',
    value: 'like'
  },
  {
    label: '❤️',
    value: 'love'
  },
  {
    label: '😄',
    value: 'haha'
  },
  {
    label: '😯',
    value: 'wow'
  },
  {
    label: '😡',
    value: 'angry'
  },
  {
    label: '😢',
    value: 'sad'
  }
]


const CurrentReaction = React.forwardRef(({reaction, showListReaction, hideListReaction, reactPost}, ref) =>{
  const reactionData = listReaction.find(r => r.value === reaction) ||
    {
      value: Reaction.Like
    };
  // debugger
  useEffect(() => {
    clearTimeout(ref.current);
  }, [reaction])
  return (
    <div
      className={`column is-flex is-justify-content-center is-align-items-center  `}
    >

      <div className={`button is-white`}
           onMouseOver={showListReaction}
           onMouseOut={hideListReaction}
           onClick={() => {
             reactPost(reactionData.value);
           }}
      >
        <span className={'is-size-5 mr-1'}>
        {reaction && <span>{reactionData.label}</span>}
        </span>
        {
          !reaction && <span className={'icon is-size-5 mr-1'}>
          <i className="fa-regular fa-thumbs-up"></i>
        </span>

        }
        <span>{utils.upperCaseFirst(reactionData.value)}</span>
      </div>
    </div>
  )

})

function getEmotion(reactionType) {
  const reaction = listReaction.find(r => r.value === reactionType);
  return reaction.label;
}

function PostInteractData({totalReaction, comments}) {
  const totalReactionCount = totalReaction.reduce((total, reaction) => total + reaction.value, 0);
  const sortReactions = structuredClone(totalReaction).filter(r => r.value > 0).sort((a, b) => b.value - a.value);
  if (totalReactionCount === 0) return null;
  return (
    <div className={`is-flex`}>
      <div className={`is-flex is-align-items-center`} style={{flexBasis: '50%'}}>
        {sortReactions.map((r, index) =>
          <div style={{
            backgroundColor: 'white',
            borderRadius: 30, width: 30, textAlign: 'center',
            border: '1px solid white',
            marginLeft: `${index > 0 ? '-8px' : 0}`,
            zIndex: Number(10 - index)
          }}
               className={`is-size-6`}
               key={r.type}
          >
            {getEmotion(r.type)}
          </div>)}
        <span className={`ml-1`}>{totalReactionCount}</span>
      </div>
    </div>
  )

}

export default Post;