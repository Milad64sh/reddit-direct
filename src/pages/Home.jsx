import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPosts,
  setSearchTerm,
  setSelectedSubreddit,
} from '../features/posts/postsSlice';
import PostList from '../components/PostList';
import PostComments from '../components/PostComments';
import Subreddits from '../components/Subreddits';
import Header from '../components/Header';
import styles from './home.module.scss';

const Home = () => {
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
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

  // TOGGLE COMMENT

  const handleShowComments = (postId, postSubreddit) => {
    setSelectedPost({ id: postId, subreddit: postSubreddit });
    setShowComments((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <header>
        <Header onSearch={handleSearch} />
      </header>
      <aside>
        <Subreddits onSubredditClick={handleSubredditClick} />
      </aside>
      <main>
        <h1>Reddit Posts</h1>
        {postStatus === 'loading' && <p>Loading...</p>}
        {postStatus === 'succeeded' && (
          <PostList onShowComments={handleShowComments} posts={posts} />
        )}
        {postStatus === 'failed' && <p>Error: {error}</p>}
      </main>
      <aside>
        {' '}
        {showComments && selectedPost && (
          <PostComments
            postId={selectedPost.id}
            subreddit={selectedPost.subreddit}
          />
        )}
      </aside>
    </div>
  );
};

export default Home;
