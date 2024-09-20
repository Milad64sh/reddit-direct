import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../features/comments/commentsSlice';
import styles from './postComments.module.scss';
const PostComments = ({ subreddit, postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const status = useSelector((state) => state.comments.status);
  const error = useSelector((state) => state.comments.error);

  useEffect(() => {
    dispatch(fetchComments({ subreddit, postId }));
  }, [dispatch, subreddit, postId]);

  if (status === 'loading') {
    return <p>Loading comments...</p>;
  }

  if (status === 'failed') {
    return <p>Error loading comments: {error}</p>;
  }
  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.body}</p>
              <p>
                <strong>Author:</strong> {comment.author}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
};

export default PostComments;
