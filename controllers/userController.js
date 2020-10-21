const boom = require('@hapi/boom');
const { Router } = require('express');
const rescue = require('express-rescue');

const { User } = require('../models');

const users = Router();

users.get('/', rescue(async (_req, res) => {
  await User.findAll().then((result) => res.status(200).json(result));
}));

users.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (user.error) {
    return next(boom.notFound(user.message));
  }

  return res.status(200).json(user);
}));

users.post('/', rescue(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const user = await User.create({ displayName, email, password, image });

  if (user.error) {
    return next(boom.badData(user.message));
  }

  return res.status(201).json(user);
}));

users.put('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const { displayName, email, password, image } = req.body;

  const newuser = await User.update({ displayName, email, password, image }, { where: { id } });

  if (newuser.error) {
    const error = newuser.code === 'not_found'
      ? boom.notFound(newuser.message)
      : boom.badData(newuser.message);

    return next(error);
  }

  return res.status(200).json(newuser);
}));

users.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  await User.destroy({ where: { id } });

  return res.status(204).end();
}));

module.exports = users;
