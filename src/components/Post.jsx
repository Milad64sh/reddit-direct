import React from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import styles from './post.module.scss';

const Post = ({
  title,
  description,
  link,
  numComments,
  imageUrl,
  onShowComments,
}) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.imgContainer}>
        {imageUrl && <img src={imageUrl} alt='Post Preview' />}
      </div>
      <a href={link} target='_blank' rel='noopener noreferrer'>
        Read more
      </a>
      <div className={styles.comment} onClick={onShowComments}>
        <span className={styles.commentIcon}>
          <FaCommentAlt />
        </span>{' '}
        {numComments} comment
      </div>
    </div>
  );
};

export default Post;
