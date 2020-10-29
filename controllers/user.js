const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const userService = require('../services/user');
require('dotenv').config();

const secret = process.env.SECRET || 'seusecretdetoken';

const generateToken = (userObj) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const { password, ...user } = userObj;
  const token = jwt.sign({ user }, secret, jwtConfig);
  return token;
};

const createUser = rescue(async (req, res) => {
  const newUser = await userService.createUser(req.body);
  return res.status(201).json(newUser);
});

const login = rescue(async (req, res, next) => {
  const response = await userService.userLogin(req.body);
  if (response.errors) return next(response);
  const token = generateToken(response);
  return res.status(200).json({ response, token });
});

const getAll = async (_req, res) => res.status(200).json(await userService.getAll());

module.exports = { createUser, login, getAll };
