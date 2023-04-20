import React, {useState} from 'react';
import Post from "../newFeed/Post/Post";
import PostCreate from "../newFeed/PostCreate/PostCreate";
import utils from "../../utils/utils";
import {useSelector} from "react-redux";


function Timeline({timeline}) {
  const [createPost, setCreatePost] = useState(false);
  const user = useSelector(state => state.user);

  function onPosted() {

  }

  return (
    <>
      {
        createPost && <PostCreate onclose={() => setCreatePost(false)}
                                  onPosted={onPosted}
        />
      }
      {
        <div className={'card columns container mx-auto'}>
          <div className={`column is-1 is-6-mobile`}>
            <figure className="image is-48x48">
              <img className={`is-rounded`}
                   style={{width: 48, height: 48}}
                   src={user.avatar || utils.defaultAvatar}
              />
            </figure>
          </div>
          <div className={`column is-8`}>
            <input className={`input ml-2 is-clickable`}
                   placeholder={`What\'s on your mind, ${user.fullName} ?`}
                   onFocus={() => setCreatePost(true)}
            />
          </div>
        </div>
      }
      {
        timeline && timeline.map(post =>
          <div className={`mb-3`}>
            <Post key={post._id}
                  postData={post}

            />
          </div>)
      }
    </>
  );
}

export default Timeline;