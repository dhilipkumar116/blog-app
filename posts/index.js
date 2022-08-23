const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { id, title };
  // res.status(201).send(posts[id]);
  // 201 - created resource

  // emitting events to event-bus
  await axios.post(
    'http://event-bus-clusterip-srv:4005/events',
    {
      type: 'PostCreated',
      data: { id, title },
    }
  );
});

app.post('/events', (req, res) => {
  console.log('Event Received:', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('listening to port 4000(posts)...');
});
