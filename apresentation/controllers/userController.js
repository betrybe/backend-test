const { Router } = require('express');
const { User } = require('../../models/Users');

const user = Router();

user.post('/user', (req, res, next) => {
  const { name, email } = req.body;

  User.create({ name, email })
    .then((newUser) => res.status(201).json(newUser))
    .catch(next);
});

module.exports = user;
