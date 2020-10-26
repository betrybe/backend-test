const { Router } = require('express');
const { createUser, getAllUsers, getUserById, deteleUserById } = require('../services/userServices');
const auth = require('../middlewares/auth');

const users = Router();

const create = async (req, res) => {
  console.log('cheguei aq');
  const { displayName, email = null, password, image } = req.body;
  const { status, response } = await createUser(displayName, email, password, image);
  return res.status(status).json(response);
};

const getAll = async (_req, res) => {
  const allUsers = await getAllUsers();
  return res.status(200).json(allUsers);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await getUserById(id);
  return res.status(status).json(response);
};

const deleteById = async (req, res) => {
  const { dataValues: { id } } = req.user;
  const { status } = await deteleUserById(id);
  return res.status(status).json();
};

users.route('/')
  .post(create)
  .get(auth(true), getAll);

users.route('/:id')
  .get(auth(true), getById);

users.route('/me')
  .delete(auth(true), deleteById);

module.exports = users;
