import React from 'react';
import Post from './Post';

const PostList = ({ posts, onShowComments }) => {
  return (
    <div className='post-list'>
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          description={post.selftext || 'No description available'}
          link={post.url}
          numComments={post.num_comments}
          subreddit={post.subreddit}
          postId={post.id}
          imageUrl={post.url}
          onShowComments={() => {
            onShowComments(post.id, post.subreddit);
            console.log(post.id);
          }}
        />
      ))}
    </div>
  );
};

export default PostList;
