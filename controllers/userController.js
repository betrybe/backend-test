const rescue = require('express-rescue');
const { usersService } = require('../services');
const { generateToken } = require('../utils');

const createUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await usersService.createUser(displayName, email, password, image);

  if (newUser.error) {
    return res.status(newUser.error.statusCode).json(newUser.error);
  }

  const token = generateToken({ newUser });

  return res.status(201).json({ token });
});

module.exports = {
  createUser,
};
