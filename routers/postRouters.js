const router = require('express').Router();
const { validateNewPost } = require('../middlewares');
const { Post, User } = require('../models');

module.exports = (() => {
  router.post('/', validateNewPost, async (req, res, _next) => {
    const { title, content } = req.body;
    const { id } = req.user;
    try {
      await Post.create({
        title,
        content,
        userId: id,
        published: new Date(),
      });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong', error });
    }
    return res.status(201).json({ title, content, userId: id });
  });
  router.get('/', async (_req, res, _next) => {
    const posts = await Post.findAll({
      include: {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
    });
    res.status(200).json(posts);
  });

  router.put('/:id', validateNewPost, async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const { id: userId } = req.user;
    try {
      const updatePost = await Post.update(
        { title, content, updated: new Date() },
        {
          where: { id, userId },
        },
      );
      if (updatePost[0] === 0) {
        return res.status(401).json({ message: 'Usuário não autorizado' });
      }
      const updatedPost = await Post.findByPk(id, {
        attributes: { exclude: ['password'] },
        limit: 1,
      });
      return res.status(200).json(updatedPost);
    } catch (error) {
      return res.status(400).json({ error });
    }
  });

  router.get('/:id', async (req, res, _next) => {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id, {
        include: {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        limit: 1,
      });
      if (post === null) {
        return res.status(404).json({ message: 'Post não existe' });
      }
      res.status(200).json(post);
    } catch (error) {
      return res.status(400).json({ message: 'Algo deu errado' });
    }
  });
  return router;
})();
