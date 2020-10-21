const Boom = require('boom');
const rescue = require('express-rescue');

const { Post } = require('../services');

const createPost = rescue(async (req, res, next) => {
  const { title, content } = req.body;
  const { id: userId } = req.user;

  const { message } = await Post.validate({ title, content });
  if (message) return next(Boom.badRequest(message));
  console.log(title, content);
  const post = await Post.createPost({ title, content, userId });
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
  const { id: userId } = req.user;
  const { id } = req.params;
  const { title, content } = req.body;

  const { message } = await Post.validate({ title, content });
  if (message) return next(Boom.badRequest(message));

  const updatedPost = await Post.updatePostById(id, { title, content }, userId);
  if (updatedPost.message) return next(Boom.unauthorized(updatedPost.message));

  return res.status(203).json({ ...updatedPost });
});

const userOwnerShip = (restrict = true) => rescue(async (req, _res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  const post = await Post.getPostById(id);
  if (!post) return next(Boom.notFound(post.message));
  if (post.user.id !== userId && restrict) {
    return next(Boom.unauthorized('Usuário não autorizado'));
  }

  req.post = post;
  return next();
});

const deletePost = rescue(async (req, res) => {
  const { id } = req.params;
  await Post.deletePostById(id);
  return res.status(204).end();
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  userOwnerShip,
};
