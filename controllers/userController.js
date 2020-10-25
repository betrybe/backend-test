const { Router } = require('express');
const rescue = require('express-rescue');
const { User } = require('../models');

const user = Router();

user.post('/users', rescue((req, res, next) => {
  const { displayName, email, password, image } = req.body;

  User.create({ displayName, email, password, image })
    .then((newUser) => res.status(201).json(newUser))
    .catch(next);
}));

module.exports = user;
