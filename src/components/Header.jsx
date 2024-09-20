import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, fetchPosts } from '../features/posts/postsSlice';
import styles from './header.module.scss';
import { FaRedditAlien } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';

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
    <header className={styles.container}>
      <div className={styles.logo}>
        <FaRedditAlien />
      </div>
      <form onSubmit={handleSubmitSearchInput} className={styles.searchForm}>
        <input
          type='text'
          placeholder='Search Posts ...'
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className={styles.searchBtn} type='submit'>
          <IoIosSearch />
        </button>
      </form>
    </header>
  );
};

export default Header;
