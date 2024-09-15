import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsComments } from '../../api/redditApi';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async ({ subreddit, postId }) => {
    const response = await fetchPostsComments(subreddit, postId);
    return response;
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;
