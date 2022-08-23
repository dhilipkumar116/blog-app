const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
const handleEvents = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.map((comment) =>
      comment.id === id
        ? ((comment.status = status),
          (comment.content = content))
        : comment
    );
  }
};

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);
  res.send({});
});

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.listen(4002, async () => {
  console.log('listening on port 4002(query)...');
  const res = await axios.get('http://event-bus-clusterip-srv:4005/events');
  for (let event of res.data) {
    console.log('processing event:', event.type);
    handleEvents(event.type, event.data);
  }
});
