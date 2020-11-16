const rescue = require('express-rescue');
const { postsService } = require('../services');

const createPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  const newPost = await postsService.createPost(title, content, id);
  if (newPost.error) return res.status(newPost.error.statusCode).json(newPost.error);
  return res.status(201).json(newPost);
});

const getAllPosts = rescue(async (req, res) => {
  const posts = await postsService.getAll();
  console.log('asdasdasd', posts);
  return res.status(200).json(posts);
});

const getPostById = rescue(async (req, res) => {
  const { id } = req.params;
  const post = await postsService.getById(id);
  if (post.error) return res.status(post.error.statusCode).json(post.error);
  return res.status(200).json(post);
});

const updatePostById = rescue(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { title, content } = req.body;
  const post = await postsService.updateById(id, userId, { title, content });
  if (post.error) return res.status(post.error.statusCode).json(post.error);
  return res.status(200).json(post);
});

const deletePostById = rescue(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const post = await postsService.deleteById(id, userId);
  if (post && post.error) return res.status(post.error.statusCode).json(post.error);
  return res.status(204).json();
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
