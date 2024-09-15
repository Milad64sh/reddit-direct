export const ROOT = 'https://www.reddit.com';

export const fetchPostsFromReddit = async (subreddit = 'all') => {
  try {
    const response = await fetch(`${ROOT}/r/${subreddit}.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.data.children.map((child) => child.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchPostsComments = async (subreddit, postId) => {
  try {
    const response = await fetch(
      `${ROOT}/r/${subreddit}/comments/${postId}.json`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    const comments = json[1].data.children.map((child) => child.data);
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const fetchSubreddits = async () => {
  try {
    const response = await fetch(`${ROOT}/subreddits.json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    return json.data.children.map((child) => child.data);
  } catch (error) {
    console.error('Error fetching subreddits:', error);
    throw error;
  }
};
