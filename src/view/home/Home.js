import React, {useState} from 'react';
import PostCreate from "./PostCreate/PostCreate";
import {useSelector} from "react-redux";
import utils from "../../utils/utils";
import {useQuery} from "react-query";
import {beClient} from "../../config/BeClient";
import Post from "./Post/Post";

function loadNewsFeed() {
  return beClient.get('/news-feed').then(res => res.data);
}

function Home() {
  const [createPost, setCreatePost] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const user = useSelector(state => state.user);
  const {data: posts, isLoading, isFetching, reFetch} = useQuery('new-feeds', loadNewsFeed);
  const onPosted = () => {
    setCreatePost(false)
    console.log('posted');
  };
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
          posts.map(post => <Post key={post._id} postData={post}/>)
        }
      </div>
    </div>
  );
}

export default Home;