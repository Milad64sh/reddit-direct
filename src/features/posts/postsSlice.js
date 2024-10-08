import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts } from '../../services/redditService';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ subreddit, searchTerm }) => {
    return await getPosts(subreddit, searchTerm);
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: '',
    error: null,
    searchTerm: '',
    selectedSubreddit: 'all',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, setSelectedSubreddit } = postsSlice.actions;
export default postsSlice.reducer;
