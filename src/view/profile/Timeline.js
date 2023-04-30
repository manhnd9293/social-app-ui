import React, {useEffect, useState} from 'react';
import Post from "../newFeed/Post/Post";
import PostCreate from "../newFeed/PostCreate/PostCreate";
import utils from "../../utils/utils";
import {useSelector} from "react-redux";
import PostDetail from "../newFeed/PostDetail";
import postService from "../../services/PostService";


function Timeline({initialPosts}) {
  const [createPost, setCreatePost] = useState(false);
  const [posts, setPosts] = useState(initialPosts.posts);
  const [hasMore, setHasMore] = useState(initialPosts.hasMore);
  const user = useSelector(state => state.user);
  const [focusedPost, setFocusedPost] = useState(null);

  useEffect(() => {
    setPosts(initialPosts.posts);
  }, [initialPosts]);


  function onPosted() {

  }


  async function onReaction({postId, reactionType}) {
    const post = posts.find(p => p._id === postId);
    const reaction = post.reaction || null;
    const updateData = await postService.mutateReaction({postId, reactionType, reaction});
    const copyPosts = structuredClone(posts);
    const index = copyPosts.findIndex(p => p._id === postId);
    const updatePost = copyPosts[index];
    updatePost.reaction = updateData.reaction;
    updatePost.totalReaction = updateData.totalReaction;
    setPosts(copyPosts);
    focusedPost && setFocusedPost(structuredClone(updatePost));
  }

  const updateTotalComment = (postId, totalComment) => {
    const updatePostIndex = posts.findIndex(p => p._id === postId);
    const copyPosts = structuredClone(posts);
    const updatePost = copyPosts[updatePostIndex];
    updatePost.comments = totalComment;
    setPosts(copyPosts);
    focusedPost && setFocusedPost(structuredClone(updatePost));
  };

  return (
    <>
      {
        createPost &&
        <PostCreate onclose={() => setCreatePost(false)}/>
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
        posts && posts.map(post =>
          <div className={`mb-3`}
               key={post._id}
          >
            <Post postData={post}
                  onReaction={onReaction}
                  onCommentClick={setFocusedPost}
            />
          </div>)
      }
      {
        focusedPost &&
        <PostDetail post={focusedPost}
                    reactPost={onReaction}
                    closePostModal={()=>setFocusedPost(null)}
                    updateTotalComment={updateTotalComment}
        />
      }
    </>
  );
}

export default Timeline;