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
  onShowComments,
}) => {
  return (
    <div className='post'>
      <h3>{title}</h3>
      <p>{description}</p>
      {imageUrl && <img src={imageUrl} alt='Post Preview' />}
      <a href={link} target='_blank' rel='noopener noreferrer'>
        Read more
      </a>
      <span onClick={onShowComments}>
        <FaCommentAlt /> {numComments} comment
      </span>
    </div>
  );
};

export default Post;
