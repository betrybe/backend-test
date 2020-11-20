const express = require('express');
const rescue = require('express-rescue');
const { Post } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');
const { validatePostData } = require('../services/validatePost');

const router = express.Router();

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.user;
  console.log('dataValues: ', userId);

  const validation = await validatePostData(title, content);
  if (validation.error) {
    return res.status(validation.status).json({ message: validation.message });
  }

  const post = await Post.create({ title, content, userId });
  console.log('post: ', post);
  res.status(201).json(post);
};

const getPosts = async (_req, res) => {
  const posts = await Post.findAll({});
  res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  res.status(200).json(post);
};

const deletePostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByPk(id);
  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }

  const { userId } = req.user;
  if (id !== userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  await Post.destroy({ where: { id } });
  res.status(204).end();
};

router.post('/', authMiddleware, rescue(createPost));
router.get('/', authMiddleware, rescue(getPosts));
router.get('/:id', authMiddleware, rescue(getPostById));
router.delete('/:id', authMiddleware, rescue(deletePostById));

module.exports = router;
