const rescue = require('express-rescue');
const postService = require('../services/post');

const createPost = rescue(async (req, res) => {
  const { id } = req.user;
  res.status(201).json(await postService.createPost(req.body, id));
});

// const deleteUser = rescue(async (req, res) => {
//   await userService.deleteUser(req.user.id);
//   return res.status(204).json();
// });

const getAll = async (_req, res) => res.status(200).json(await postService.getAll());

const getById = async (req, res, next) => {
  const post = await postService.getById(req.params.id);
  if (post.message) return next({ errors: [{ message: post.message }], code: 404 });
  return res.status(200).json(post);
};

module.exports = { createPost, getAll, getById };
