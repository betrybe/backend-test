const rescue = require('express-rescue');
const { usersService } = require('../services');
const { Users } = require('../models/index');
const { generateToken } = require('../utils');

const createUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { error } = usersService.validateUser({ displayName, email, password });

  if (error) return res.status(400).json(error);

  const newUser = await Users.create({ displayName, email, password, image });

  const token = generateToken({ newUser });

  return res.status(201).json({ token });
});

module.exports = {
  createUser,
};
