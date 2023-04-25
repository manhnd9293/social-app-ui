import React, {useEffect, useRef, useState} from 'react';
import PostCreate from "./PostCreate/PostCreate";
import {useSelector} from "react-redux";
import utils from "../../utils/utils";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {beClient} from "../../config/BeClient";
import Post from "./Post/Post";
import {Media} from "../../utils/Constant";
import PostDetail from "./PostDetail";
import postService from "../../services/PostService";

function loadNewsFeed() {
  return beClient.get('/news-feed').then(res => res.data);
}

async function mutateReaction({postId, reactionType, reaction}) {
  if (!reaction || reaction !== reactionType) {
    return beClient.patch(`/post/reaction`, {
      id: postId,
      media: Media.Post,
      react: reactionType
    }).then(res => res.data);
  } else {
    return beClient.patch(`/post/un-reaction`, {
      mediaType: Media.Post,
      mediaId: postId
    }).then(res => res.data)
  }
}

function NewsFeed() {
  const [createPost, setCreatePost] = useState(false);
  const [focusedPost, setFocusedPost] = useState(null);
  const user = useSelector(state => state.user);
  const queryClient = useQueryClient();
  const {data, isLoading, isFetching, reFetch} = useQuery('news-feed', loadNewsFeed);
  const loadFeedBreakPoint = useRef(null);
  const {posts, hasMore} = {...data};

  const mutation = useMutation({
    mutationFn: mutateReaction,
    onSuccess: (data, variables) => {
      queryClient.setQueriesData(['news-feed'], (oldData) => {
        const feeds = structuredClone(oldData);
        const { postId } = variables;
        const index = feeds.posts.findIndex(post => post._id === postId);
        const post = feeds.posts[index];
        post.reaction = data.reaction;
        post.totalReaction = data.totalReaction;
        focusedPost && setFocusedPost(structuredClone(post));

        return {
          posts: [...feeds.posts.slice(0, index), post, ...feeds.posts.slice(index + 1)],
          hasMore: feeds.hasMore
        };
      })
    }
  });

  const updateTotalComment = (postId, totalComment) => {
    queryClient.setQueriesData(['news-feed'], (oldData) => {
      const feeds = structuredClone(oldData);
      const index = feeds.posts.findIndex(post => post._id === postId);
      const post = feeds.posts[index];
      post.comments = totalComment;
      focusedPost && setFocusedPost(structuredClone(post));

      return {
        posts: [...feeds.posts.slice(0, index), post, ...feeds.posts.slice(index + 1)],
        hasMore: feeds.hasMore
      };
    })

  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const loadMorePost = entries[0];
      if (loadMorePost.isIntersecting && hasMore) {
        loadMorePosts();
      }
      if (!hasMore) {
        observer.unobserve(loadFeedBreakPoint.current);
        loadFeedBreakPoint.current = null;
      }
    });
    loadFeedBreakPoint.current && observer.observe(loadFeedBreakPoint.current);

    return () => {
      loadFeedBreakPoint.current && observer.unobserve(loadFeedBreakPoint.current);
    };
  }, [posts]);


  const onPosted = () => {
    setCreatePost(false)
  };

  async function reactPost({postId, reactionType}) {
    const post = posts.find(p => p._id === postId);
    const reaction = post.reaction || null;
    mutation.mutate({postId, reactionType, reaction: reaction});
  }

  function focusPost(post) {
    setFocusedPost(post)
  }

  function loadMorePosts() {
    if(posts.length === 0 || !hasMore) return;

    return beClient.get(`/news-feed?lastId=${posts[posts.length-1]._id}`).then(res => {
      const morePosts = res.data.posts;
      const hasMore = res.data.hasMore;
      queryClient.setQueriesData(['news-feed'], oldPosts => {
        const feeds = structuredClone(oldPosts);
        return {posts: [...feeds.posts, ...morePosts], hasMore}
      })
    });
  }


  return (
    <div className=''>
      {createPost && <PostCreate onclose={() => setCreatePost(false)}
                                 onPosted={onPosted}
      />}
      <div className={'card columns container mx-auto mt-3'} style={{ maxWidth: 600}}>
        <div className={`column is-1 is-6-mobile`}>
          <figure className="image is-48x48">
            <img className={`is-rounded`} style={{width: 48, height: 48}} src={user.avatar || utils.defaultAvatar}/>
          </figure>
        </div>
        <div className={`column is-8`}>
          <input className={`input ml-2 is-clickable`} placeholder={`What\'s on your mind, ${user.fullName} ?`}
                 onFocus={()=> setCreatePost(true)}
          />
        </div>
      </div>
      <div className={`container mx-auto mt-3`} style={{maxWidth: 600}}>
        {
          posts && posts.length > 0 &&
          posts.map((post, index) =>
            <div className={`mb-3`}
                 key={post._id}
            >
              <Post postData={post}
                    onReaction={reactPost}
                    onCommentClick={focusPost}
              />
              {index === posts.length - 6 && <div ref={loadFeedBreakPoint}/>}
            </div>
          )
        }
      </div>
      {
        focusedPost &&
        <PostDetail post={focusedPost}
                    reactPost={reactPost}
                    closePostModal={()=>setFocusedPost(null)}
                    updateTotalComment={updateTotalComment}
        />
      }
    </div>
  );
}

export default NewsFeed;

export {mutateReaction}