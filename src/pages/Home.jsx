import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import PostList from '../components/PostList';
import Subreddits from '../components/Subreddits';

const Home = () => {
  const [selectedSubreddit, setSelectedSubreddit] = useState('all');
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts(selectedSubreddit));
    }
  }, [postStatus, dispatch, selectedSubreddit]);
  const handleSubredditClick = (Subreddit) => {
    setSelectedSubreddit(Subreddit);
  };
  return (
    <div>
      <h1>Reddit Posts</h1>
      {postStatus === 'loading' && <p>Loading...</p>}
      {postStatus === 'succeeded' && <PostList posts={posts} />}
      {postStatus === 'failed' && <p>Error: {error}</p>}
      <aside>
        <Subreddits onSubredditClick={handleSubredditClick} />
      </aside>
    </div>
  );
};

export default Home;
