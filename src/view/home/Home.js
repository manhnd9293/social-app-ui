import React, {useState} from 'react';
import PostCreate from "./PostCreate/PostCreate";
import {useSelector} from "react-redux";
import utils from "../../utils/utils";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {beClient} from "../../config/BeClient";
import Post from "./Post/Post";
import {Media} from "../../utils/Constant";

function loadNewsFeed() {
  return beClient.get('/news-feed').then(res => res.data);
}

async function mutateReaction({postId, reactionType, reaction}) {
  if (!reaction) {
    return beClient.patch(`/post/reaction/`, {
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

function Home() {
  const [createPost, setCreatePost] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const user = useSelector(state => state.user);
  const queryClient = useQueryClient();
  const {data: posts, isLoading, isFetching, reFetch} = useQuery('news-feed', loadNewsFeed);

  const mutation = useMutation({
    mutationFn: mutateReaction,
    onSuccess: (data, variables) => {
      queryClient.setQueriesData(['news-feed'], (oldData) => {
        const feeds = structuredClone(oldData);
        const {postId} = variables;
        const index = feeds.findIndex(post => post._id === postId);
        const post = feeds[index];
        post.reaction = data.reaction;
        post.totalReaction = data.totalReaction;

        //todo: ask server return update reaction amount
        return [...feeds.slice(0, index), post, ...feeds.slice(index + 1)];
      })
    }
  });

  const onPosted = () => {
    setCreatePost(false)
  };

  async function reactPost({postId, reactionType}) {
    const post = posts.find(p => p._id === postId);
    const reaction = post.reaction || null;
    mutation.mutate({postId, reactionType, reaction: reaction});
  }

  return (
    <div className=''>
      {createPost && <PostCreate onclose={() => setCreatePost(false)}
                                 onPosted={onPosted}
      />}
      <div className={'card columns container is-flex is-justify-content-center is-align-items-center mx-auto mt-3'} style={{width: '60%', maxWidth: 600}}>
        <div className={`column is-1`}>
          <figure className="image is-48x48">
            <img className={`is-rounded`} style={{width: 48, height: 48}} src={user.avatar || utils.defaultAvatar}/>
          </figure>
        </div>
        <div className={`column`}>
          <input className={`input ml-2`} placeholder={`What\'s on your mind, ${user.fullName} ?`}
                 onFocus={()=> setCreatePost(true)}
          />
        </div>
      </div>
      <div className={`container mx-auto mt-3`} style={{width: '60%', maxWidth: 600}}>
        {
          posts && posts.length > 0 &&
          posts.map(post => <Post key={post._id}
                                  postData={post}
                                  onReaction={reactPost}
          />)
        }
      </div>
    </div>
  );
}

export default Home;