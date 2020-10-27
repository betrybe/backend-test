const { Router } = require('express');
const { Posts, Users } = require('../models');
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

post.get('/', auth, async (req, res) => {
  const postResults = await Posts.findAll({
    include: [{ model: Users, as: 'user' }] });
  console.log(postResults.Users);
  res.status(200).send(postResults);
});

post.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const postResults = await Posts.findOne({ where: { id },
    include: [{ model: Users, as: 'user' }] });
  if (!postResults) {
    res.status(404).send({ message: 'Post não existe' });
  }
  console.log(postResults.Users);
  res.status(200).send(postResults);
});

module.exports = post;
