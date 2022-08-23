import React from 'react';
import axios from 'axios';

const CommentList = ({ comments }) => {
  const renderComments = comments.map((comment) => {
    let content;
    if (comment.status === 'approved') {
      content = comment.content;
    }
    if (comment.status === 'pending') {
      content = 'comment is awaiting moderation';
    }
    if (comment.status === 'rejected') {
      content = 'comment has been rejected';
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderComments}</ul>;
};

export default CommentList;
