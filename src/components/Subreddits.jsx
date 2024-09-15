import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubredditsThunk } from '../features/subreddits/subredditsSlice';

const Subreddits = ({ onSubredditClick }) => {
  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.subreddits.list);
  const status = useSelector((state) => state.subreddits.status);
  const error = useSelector((state) => state.subreddits.error);

  useEffect(() => {
    dispatch(fetchSubredditsThunk());
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading subreddits...</p>;
  }

  if (status === 'failed') {
    return <p>Error loading subreddits: {error}</p>;
  }

  return (
    <div className='sidebar'>
      <h3>Subreddits</h3>
      <ul>
        {subreddits.map((subreddit) => (
          <li key={subreddit.id}>
            <button onClick={() => onSubredditClick(subreddit.display_name)}>
              {subreddit.display_name_prefixed}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subreddits;
