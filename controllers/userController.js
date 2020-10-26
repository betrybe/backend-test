const { Router } = require('express');
const { createUser, getAllUsers } = require('../services/userServices');
const auth = require('../middlewares/auth');

const users = Router();

const create = () => async (req, res) => {
  const { displayName, email = null, password, image } = req.body;
  const { status, response } = await createUser(displayName, email, password, image);
  return res.status(status).json(response);
};

const getAll = async (_req, res) => {
  const allUsers = await getAllUsers();
  return res.status(200).json(allUsers);
};

users.route('/')
  .post(create)
  .get(auth(true), getAll);

module.exports = users;
