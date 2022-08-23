import React from 'react';
import Container from '@mui/material/Container';
import PostCreate from './PostCreate';
import PostList from './PostList';

const App = () => {
  return (
    <div>
      <Container
        maxWidth='md'
        sx={{ bgcolor: '#cceeff', height: '100vh' }}>
        <h1>create posts</h1>
        <PostCreate />
        <h1>posts</h1>
        <PostList/>
      </Container>
    </div>
  );
};

export default App;
