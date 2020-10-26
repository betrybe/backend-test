const { Router } = require('express');
const {
  createPost,
  getAllPosts,
  // getPostById,
  // detelePostById
} = require('../services/postServices');
const auth = require('../middlewares/auth');

const posts = Router();

const create = async (req, res) => {
  const { title, content } = req.body;
  const { dataValues: { id } } = req.user;
  const { status, response } = await createPost(title, content, id);
  return res.status(status).json(response);
};

const getAll = async (_req, res) => {
  const allPosts = await getAllPosts();
  return res.status(200).json(allPosts);
};

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const { status, response } = await getPostById(id);
//   return res.status(status).json(response);
// };

// const deleteById = async (req, res) => {
//   const { dataValues: { id } } = req.user;
//   const { status } = await detelePostById(id);
//   return res.status(status).json();
// };
posts.route('/')
  .post(auth(true), create)
  .get(auth(true), getAll);

// users.route('/:id')
//   .get(auth(true), getById);

// users.route('/me')
//   .delete(auth(true), deleteById);

module.exports = posts;
