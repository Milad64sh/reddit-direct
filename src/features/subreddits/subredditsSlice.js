import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubreddits } from '../../api/redditApi';

export const fetchSubredditsThunk = createAsyncThunk(
  'subreddits/fetchSubreddits',
  async () => {
    const subreddits = await fetchSubreddits();
    return subreddits;
  }
);

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubredditsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubredditsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchSubredditsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default subredditsSlice.reducer;
