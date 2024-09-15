import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import subredditsReducer from '../features/subreddits/subredditsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    subreddits: subredditsReducer,
  },
});

export default store;
