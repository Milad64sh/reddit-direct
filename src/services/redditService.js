import { fetchPostsFromReddit } from '../api/redditApi';

export const getPosts = async (subreddit) => {
  const posts = await fetchPostsFromReddit(subreddit);
  return posts;
};
