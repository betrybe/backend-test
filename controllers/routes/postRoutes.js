const rescue = require('express-rescue');
const { posts } = require('../../services');

const createPost = rescue(async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.user;

  const post = await posts.createPost(title, content, id);

  if (post.status) return next(post);

  return res.status(201).json(post);
});

const getAllPosts = rescue(async (_req, res) => {
  const postsList = await posts.getAllPosts();

  return res.status(200).json(postsList);
});

const getPostById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const post = await posts.getPostById(id);

  if (post.status) return next(post);

  return res.status(200).json(post);
});

const updateOnePost = rescue(async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  const post = await posts.updateOnePost(title, content, id, userId);

  if (post.status) return next(post);

  return res.status(200).json(post);
});

const getPostsByQuery = rescue(async (req, res, next) => {
  const { q } = req.query;

  const post = await posts.getPostsByQuery(q);

  if (post.status) return next(post);

  return res.status(200).json(post);
});

const deleteOnePost = rescue(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const post = await posts.deleteOnePost(id, userId);

  if (post.status) return next(post);

  return res.status(204).json();
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updateOnePost,
  getPostsByQuery,
  deleteOnePost,
};
