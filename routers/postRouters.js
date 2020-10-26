const router = require('express').Router();
const { validateNewPost } = require('../middlewares');
const { Post } = require('../models');
const createToken = require('../utils/createToken');

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
  return router;
})();
