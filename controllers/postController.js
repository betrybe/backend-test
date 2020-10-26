const { Router } = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  // detelePostById
} = require('../services/postServices');
const { postValidate } = require('../middlewares/validateData');
const auth = require('../middlewares/auth');

const posts = Router();

const create = async (req, res) => {
  const { title, content } = req.body;
  const { dataValues: { id } } = req.user;
  console.log('id', id);
  const { status, response } = await createPost(title, content, id);
  return res.status(status).json(response);
};

const getAll = async (_req, res) => {
  const allPosts = await getAllPosts();
  return res.status(200).json(allPosts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await getPostById(id);
  return res.status(status).json(response);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { dataValues: { id: userId } } = req.user;
  console.log('userid', userId, id);
  const { status, response } = await updatePostById(id, title, content, userId);
  res.status(status).json(response);
};

// const deleteById = async (req, res) => {
//   const { dataValues: { id } } = req.user;
//   const { status } = await detelePostById(id);
//   return res.status(status).json();
// };
posts.route('/')
  .post(auth(true), create)
  .get(auth(true), getAll);

posts.route('/:id')
  .get(auth(true), getById)
  .put(auth(true), postValidate, updateById);

// users.route('/me')
//   .delete(auth(true), deleteById);

module.exports = posts;
