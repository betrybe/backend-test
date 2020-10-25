const Joi = require('joi');
const { Router } = require('express');
const rescue = require('express-rescue');
const { User } = require('../models');

const user = Router();

const validateUser = Joi.object({
  displayName: Joi.string().length(8),
  email: Joi.string().email().required(),
  password: Joi.string().length(8).required(),
});

user.post('/users', validateUser, rescue((req, res, next) => {
  const { displayName, email, password, image } = req.body;

  User.create({ displayName, email, password, image })
    .then((newUser) => res.status(201).json(newUser))
    .catch(next);
}));

module.exports = user;
