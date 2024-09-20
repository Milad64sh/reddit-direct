import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubredditsThunk } from '../features/subreddits/subredditsSlice';
import { IoIosArrowDown } from 'react-icons/io';
import styles from './subreddits.module.scss';

const Subreddits = ({ onSubredditClick }) => {
  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.subreddits.list);
  const status = useSelector((state) => state.subreddits.status);
  const error = useSelector((state) => state.subreddits.error);
  const [showSubreddits, setShowSubrredits] = useState(false);

  useEffect(() => {
    dispatch(fetchSubredditsThunk());
  }, [dispatch]);

  const toggleSubreddits = () => {
    setShowSubrredits((prev) => !prev);
  };

  if (status === 'loading') {
    return <p>Loading subreddits...</p>;
  }

  if (status === 'failed') {
    return <p>Error loading subreddits: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.toggleBtn} onClick={toggleSubreddits}>
        <h3>Categories</h3>
        <span
          className={`${styles.arrowIcon} ${
            showSubreddits ? styles.rotate : ''
          }`}
        >
          <IoIosArrowDown />
        </span>
      </button>
      {showSubreddits && (
        <ul>
          {subreddits.map((subreddit, index) => (
            <li
              className={styles.subredditItem}
              key={subreddit.id}
              style={{ '--animation-order': index }}
            >
              <button
                className={styles.subredditBtn}
                onClick={() => onSubredditClick(subreddit.display_name)}
              >
                {subreddit.display_name_prefixed}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Subreddits;
