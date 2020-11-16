const rescue = require('express-rescue');
const { postsService } = require('../services');

const createPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  const newPost = await postsService.createPost(title, content, id);
  if (newPost.error) return res.status(newPost.error.statusCode).json(newPost.error);
  return res.status(201).json(newPost);
});

module.exports = {
  createPost,
};
