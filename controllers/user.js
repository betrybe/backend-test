const { Router } = require('express');
const rescue = require('express-rescue');
const userService = require('../services/user');

const users = Router();

const createUser = rescue(async (req, res) => {
  const newUser = await userService.createUser(req.body);
  return res.status(201).json(newUser);
});

users.post('/', createUser);

module.exports = users;
