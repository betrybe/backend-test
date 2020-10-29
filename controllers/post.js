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

// const getAll = async (_req, res) => res.status(200).json(await userService.getAll());

// const getById = async (req, res, next) => {
//   const user = await userService.getById(req.params.id);
//   if (user.message) return next({ errors: [{ message: user.message }], code: 404 });
//   return res.status(200).json(user);
// };

module.exports = { createPost };
