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
  console.log(response);
  if (response.errors) return next(response);
  return res.status(200).json(response);
});

module.exports = { createUser, login, generateToken };
