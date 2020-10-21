const Boom = require('boom');
const rescue = require('express-rescue');

const { Post } = require('../services');

const createPost = rescue(async (req, res, next) => {
  const { title, content } = req.body;

  const { message } = await Post.validate({ title, content });
  if (message) return next(Boom.badRequest(message));

  const post = await Post.createPost({ title, content });
  res.status(201).json({ ...post });
});

const getAllPosts = rescue(async (_req, res) => {
  const posts = await Post.getAllPosts();
  return res.status(200).json(posts);
});

const getPostById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.getPostById(id);
  if (post.message) return next(Boom.badRequest(post.message));

  return res.status(200).json({ post });
});

const updatePost = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const { message } = await Post.validate({ title, content });
  if (message) return next(Boom.badRequest(message));

  const updatedPost = await Post.updatePostById(id, { title, content });

  return res.status(203).json({ ...updatedPost });
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};
