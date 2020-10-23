const router = require('express').Router();
const { Post } = require('../models');
const createToken = require('../utils/createToken');

module.exports = (() => {
  router.post('/', async (req, res, _next) => {
    const { title, content } = req.body;
    return res.status(200).json({ title, content });
    // try {
    //   const createPost = await Post
    //     .create({
    //       title,
    //       content,
    //     });
    // } catch (error) {
    //   next(error);
    // }
  });
  return router;
})();
