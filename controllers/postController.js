const rescue = require('express-rescue');
const { posts } = require('../services');

const createPost = rescue(async (req, res, next) => {
  const { id } = req.user;

  const response = await posts.createPost(req.body, id);

  if (response.errors) return next(response);
  return res.status(201).json(response);
});

const updatePost = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const post = await posts.updatePost(req.body, id, userId);
  if (post.code) return next({ errors: [{ message: post.message }], code: post.code });
  if (post.message) return next({ errors: [{ message: post.message }] });
  res.status(200).json(post);
});

const searchPost = rescue(async (req, res) => {
  const { q: searchParam } = req.query;
  const { status, response } = await posts.searchPost(searchParam);
  return res.status(status).json(response);
});

const deletePost = rescue(async (req, res, next) => {
  const response = await posts.deletePost(req.params.id, req.user.id);
  if (response) {
    return next({
      errors: [{ message: response.message }],
      code: response.code,
    });
  }
  return res.status(204).json();
});

const getAll = rescue(async (_req, res) =>
  res.status(200).json(await posts.getAllPosts()));

const getById = rescue(async (req, res, next) => {
  const post = await posts.getPostById(req.params.id);
  if (post.message) return next({ errors: [{ message: post.message }], code: 404 });
  return res.status(200).json(post);
});

module.exports = {
  createPost,
  getAll,
  getById,
  updatePost,
  searchPost,
  deletePost,
};
