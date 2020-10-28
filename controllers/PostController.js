const { Router } = require('express');
const { Posts, Users } = require('../models');
const auth = require('../middleware/auth');

const post = Router();

post.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
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
  res.status(200).send(postResults);
});

post.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const postResults = await Posts.findOne({ where: { id },
    include: [{ model: Users, as: 'user' }] });
  if (!postResults) {
    res.status(404).send({ message: 'Post não existe' });
  }
  res.status(200).send(postResults);
});

post.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  if (parseInt(id, 10) === req.user.id) {
    const postUpdated = await Posts.findOne({ where: { id } });
    postUpdated.title = title;
    postUpdated.content = content;
    if (title === undefined) {
      return res.status(400).send({ message: '"title" is required' });
    }
    if (content === undefined) {
      return res.status(400).send({ message: '"content" is required' });
    }
    return res.status(200).send(postUpdated);
  }
  res.status(401).send({ message: 'Usuário não autorizado' });
});

post.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const postToDelete = await Posts.findOne({ where: { id } });
  if (!postToDelete) {
    return res.status(404).send({ message: 'Post não existe' });
  }
  if (parseInt(id, 10) === req.user.id) {
    const deletedUser = await Posts.destroy({ where: { id } });
    console.log(deletedUser);

    return res.status(204).send({ message: 'Usuário não autorizado' });
  }
  res.status(401).send({ message: 'Usuário não autorizado' });
});
module.exports = post;
