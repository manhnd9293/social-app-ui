import React, {useEffect, useRef, useState} from 'react';
import utils from "../../../utils/utils";
import {useSelector} from "react-redux";
import classes from "./post.module.scss";
import {Link} from "react-router-dom";

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


function Post({postData}) {
  const {byUser, comments, content, date, totalReaction} = postData;
  const totalReactionCount = totalReaction.reduce((total, reaction) => total + reaction.value, 0);
  const user = useSelector(state => state.user);
  const [showReaction, setShowReaction] = useState(false);
  const [hoveEmoji, setHoveEmoji] = useState(null);
  const timeOutRef = useRef(null);
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
      <div>
        {content}
      </div>
      {
        totalReactionCount > 0 && totalReactionCount
      }



      {
        showReaction &&
        <div style={{position: 'absolute', zIndex: 100, bottom: 50}}
        >
          <div className={`card is-size-3 is-flex is-justify-content-center is-align-items-flex-end`} style={{height: 45}}>
            {
              listReaction.map(reaction =>
                <div className={`is-flex is-flex-direction-column m-0`}>
                  {hoveEmoji === reaction.value &&
                    <div key={reaction.value+'-'} className={`has-background-dark p-1 has-text-white is-size-6 has-text-centered`}
                         style={{borderRadius: '20px'}}
                    >{hoveEmoji}</div>
                  }
                  <div key={reaction.value}
                       className={`px-1 is-clickable is-hoverable ${hoveEmoji === reaction.value ? classes.emojiHover : ''} `}
                       onMouseEnter={() => setHoveEmoji(reaction.value)}
                       onMouseLeave={() => setHoveEmoji(null)}
                       onMouseOver={showListReaction}
                       onMouseOut={hideListReaction}
                  >{reaction.label}
                  </div>
                </div>
              )}
          </div>
        </div>
      }
      {
        <div className={`columns mt-1`}>
          <div className={`column is-flex is-justify-content-center is-align-items-center is-clickable is-hoverable ${classes.action}`}
               onMouseOver={showListReaction}
               onMouseOut={hideListReaction}
          >

            <span className={'icon'}>
              <i className="fa-regular fa-thumbs-up"></i>
            </span>
            <span>Like</span>
          </div>

          <div className={`column is-flex is-justify-content-center is-align-items-center is-clickable is-hoverable ${classes.action}`}>
            <span className={`icon`}>
              <i className="fa-regular fa-comment"></i>
            </span>
            <span>Comment</span>
          </div>
          {
            user._id !== byUser._id &&
            <div className={`column is-flex is-justify-content-center is-align-items-center is-clickable is-hoverable ${classes.action}`}>
              <span className={`icon`}>
                <i className="fa-regular fa-share-from-square"/>
              </span>
              <span>Share</span>
            </div>
          }
        </div>
      }
    </div>
  );
}

export default Post;