import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Divider } from '@mui/material';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://posts.com/posts/create', { title });
    setTitle('');
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <TextField
          id='post'
          label='title of post'
          variant='filled'
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          variant='contained'
          sx={{ mt: 1 }}
          size='small'
          type='submit'>
          submit
        </Button>
        <Divider sx={{ borderBottomWidth: 2, mt: 2 }} />
      </form>
    </Box>
  );
};

export default PostCreate;
