const rescue = require('express-rescue');
const { postServices } = require('../services');

const createPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;

  const post = await postServices.createPost(title, content, id);

  if (post.status) return res.status(post.status).json({ message: post.message });

  res.status(201).json(post);
});

const getAllPosts = rescue(async (_req, res) => {
  const posts = await postServices.getAllPosts();

  res.status(200).json(posts);
});

const getPostById = rescue(async (req, res) => {
  const { id } = req.params;

  const post = await postServices.getPostById(id);

  if (post.status) return res.status(post.status).json({ message: post.message });

  res.status(200).json(post);
});

const updateOnePost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  const post = await postServices.updateOnePost(title, content, id, userId);

  if (post.status) return res.status(post.status).json({ message: post.message });

  res.status(200).json(post);
});

const getPostsByQuery = rescue(async (req, res) => {
  const { q } = req.query;

  const post = await postServices.getPostsByQuery(q);

  if (post.status) return res.status(post.status).json({ message: post.message });

  res.status(200).json(post);
});

const deleteOnePost = rescue(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const post = await postServices.deleteOnePost(id, userId);

  if (post.status) return res.status(post.status).json({ message: post.message });

  res.status(204).json();
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updateOnePost,
  getPostsByQuery,
  deleteOnePost,
};
