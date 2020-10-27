const { Router } = require('express');
const { Posts } = require('../models');
const auth = require('../middleware/auth');

const post = Router();

post.post('/', auth, (req, res) => {
  const { title, content } = req.body;
  console.log(req.user);
  Posts.create({ title, content });
  res.status(201).send('post');
});

module.exports = post;
