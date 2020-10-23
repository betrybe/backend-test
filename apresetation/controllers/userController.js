const { Router } = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { userValidate, userInfoExist } = require('../middleware/authUser');

const SECRET = 'DiegoRafael-sd03';
const jwtConfig = { algorithm: 'HS256', expiresIn: '1h' };

const { User } = require('../../models');

const user = Router();

user.post(
  '/',
  userInfoExist,
  userValidate,
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const token = jwt.sign({ email }, SECRET, jwtConfig);

    User.create({ displayName, email, password, image }).then((newUser) =>
      res.status(201).json({ newUser, token }));
  }),
);

module.exports = user;
