import React, { useState } from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import PostComments from './PostComments';

const Post = ({
  title,
  description,
  link,
  subreddit,
  postId,
  numComments,
  imageUrl,
}) => {
  const [showComments, setShowComments] = useState(false);
  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };
  console.log(imageUrl);
  return (
    <div className='post'>
      <h3>{title}</h3>
      <p>{description}</p>
      {imageUrl && <img src={imageUrl} alt='Post Preview' />}
      <a href={link} target='_blank' rel='noopener noreferrer'>
        Read more
      </a>
      <span onClick={toggleComments}>
        <FaCommentAlt /> {numComments} comment
      </span>
      {showComments && <PostComments subreddit={subreddit} postId={postId} />}
    </div>
  );
};

export default Post;
