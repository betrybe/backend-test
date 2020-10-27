const { Router } = require('express');
const { Posts } = require('../models');
const auth = require('../middleware/auth');

const post = Router();

post.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  console.log(req.user);
  if (title === undefined) {
    return res.status(400).send({ message: '"title" is required' });
  }
  if (content === undefined) {
    return res.status(400).send({ message: '"content" is required' });
  }
  const postCreated = await Posts.create({ title, content, userId: id });
  return res.status(201).send(postCreated);
});

module.exports = post;
