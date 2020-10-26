const { Router } = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  getPostBySearch,
  detelePostById,
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

const getBySearch = async (req, res) => {
  const { q: searchTerm } = req.query;
  const { status, response } = await getPostBySearch(searchTerm);
  return res.status(status).json(response);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { dataValues: { id: userId } } = req.user;
  const { status, response } = await detelePostById(id, userId);
  return response ? res.status(status).json(response) : res.status(status).json();
};

posts.route('/search')
  .get(auth(true), getBySearch);

posts.route('/:id')
  .get(auth(true), getById)
  .put(auth(true), postValidate, updateById)
  .delete(auth(true), deleteById);

posts.route('/')
  .post(auth(true), create)
  .get(auth(true), getAll);

// users.route('/me')
//   .delete(auth(true), deleteById);

module.exports = posts;
