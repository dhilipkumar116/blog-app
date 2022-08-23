import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Divider,
  Stack,
} from '@mui/material';

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    // logic
    await axios.post(
      `http://posts.com/posts/${postId}/comments`,
      { content }
    );
    setContent('');
  };

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Stack
          direction='row'
          sx={{
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TextField
            sx={{ width: '75%' }}
            hiddenLabel
            placeholder='comment...'
            id='content'
            variant='filled'
            size='small'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            type='submit'
            variant='contained'
            size='small'
            sx={{ maxHeight: '30px' }}>
            add
          </Button>
        </Stack>
      </form>
      <Divider sx={{ borderBottomWidth: 3, mt: 1 }} />
    </Box>
  );
};

export default CommentCreate;
