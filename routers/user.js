const express = require('express');
const { usersControllers } = require('../controllers');
const middlewares = require('../middlewares');

const usersRouter = express.Router();

usersRouter
  .get('/', middlewares.auth(), usersControllers.getAll)
  .get('/:id', middlewares.auth(), usersControllers.getUserById)
  .post('/', usersControllers.register)
  .delete('/me', middlewares.auth(), usersControllers.deleteUser);

module.exports = usersRouter;
