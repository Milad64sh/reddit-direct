import { fetchPostsFromReddit } from '../api/redditApi';

export const getPosts = async (subreddit, searchTerm) => {
  const posts = await fetchPostsFromReddit(subreddit, searchTerm);
  return posts;
};
