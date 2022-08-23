const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const events = [];
app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://post-clusterip-srv:4000/events', event); //post service
  axios.post('http://comments-clusterip-srv:4001/events', event); //comment service
  axios.post('http://query-clusterip-srv:4002/events', event); //query service
  axios.post('http://moderation-clusterip-srv:4003/events', event); //moderation service

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () =>
  console.log('listening on port 4005(event-bus)....')
);
