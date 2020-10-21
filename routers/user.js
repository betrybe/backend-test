const express = require('express');
const { usersControllers } = require('../controllers');
const middlewares = require('../middlewares');

const usersRouter = express.Router();

usersRouter
  .post('/', usersControllers.register)
  // .get('/', usersControllers.getUserByEmail)
  .get('/', middlewares.auth(), usersControllers.getAll)
  .get('/:id', middlewares.auth(), usersControllers.getUserById);

module.exports = usersRouter;
