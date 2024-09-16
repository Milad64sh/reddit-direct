import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  setSearchTerm,
  setSelectedSubreddit,
} from '../features/posts/postsSlice';
import PostList from '../components/PostList';
import Subreddits from '../components/Subreddits';
import Header from '../components/Header';

const Home = () => {
  // const [selectedSubreddit, setSelectedSubreddit] = useState('all');
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const searchTerm = useSelector((state) => state.posts.searchTerm);
  const selectedSubreddit = useSelector(
    (state) => state.posts.selectedSubreddit
  );

  useEffect(() => {
    if (selectedSubreddit) {
      dispatch(fetchPosts({ subreddit: selectedSubreddit, searchTerm }));
    }
  }, [dispatch, selectedSubreddit, searchTerm]);

  const handleSubredditClick = (subreddit) => {
    dispatch(setSelectedSubreddit(subreddit));
  };

  const handleSearch = (query) => {
    dispatch(setSearchTerm(query));
  };

  return (
    <div>
      <header>
        <Header onSearch={handleSearch} />
      </header>
      <aside>
        <Subreddits onSubredditClick={handleSubredditClick} />
      </aside>
      <main>
        <h1>Reddit Posts</h1>
        {postStatus === 'loading' && <p>Loading...</p>}
        {postStatus === 'succeeded' && <PostList posts={posts} />}
        {postStatus === 'failed' && <p>Error: {error}</p>}
      </main>
    </div>
  );
};

export default Home;
