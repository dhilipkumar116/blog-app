import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});
  const fetchPost = async () => {
    const res = await axios.get('http://posts.com/posts');
    setPosts(res.data);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  console.log(posts);

  const renderedPost = Object.values(posts).map((post) => {
    return (
      <Grid
        item
        key={post.id}
        sx={{
          backgroundColor: '#99ddff',
          m: 0.5,
          p: 0.5,
          paddingBottom: 2,
          width: '49%',
        }}>
        <h3>{post.title}</h3>
        <CommentCreate postId={post.id} />
        <CommentList comments={post.comments} />
      </Grid>
    );
  });

  return (
    <Box
      sx={{
        justifyContent: 'space-around',
      }}>
      <Grid
        container
        sx={{
          justifyContent: 'space-around',
        }}>
        {renderedPost}
      </Grid>
    </Box>
  );
};

export default PostList;
