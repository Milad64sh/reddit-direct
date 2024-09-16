import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, fetchPosts } from '../features/posts/postsSlice';

const Header = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.posts.searchTerm);
  const selectedSubreddit = useSelector(
    (state) => state.posts.selectedSubreddit
  );

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSubmitSearchInput = (e) => {
    e.preventDefault();
    dispatch(fetchPosts({ subreddit: selectedSubreddit, searchTerm }));
  };
  return (
    <header>
      <form onSubmit={handleSubmitSearchInput}>
        <input
          type='text'
          placeholder='Search Posts ...'
          value={searchTerm}
          onChange={handleSearch}
        />
        <button type='submit'>Search</button>
      </form>
    </header>
  );
};

export default Header;
