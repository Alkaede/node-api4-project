// implement your server here
// require your posts router and connect it here
const express = require('express');

const server = express();
server.use(express.json());

const postRouter = require('./posts/posts-router');
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`
  <h1>Hello there, welcome to the api</h1>
  <p>Have fun with it</p>
  `)
})

// exporting server to use in the index.js
module.exports = server;