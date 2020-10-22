const express = require('express');
const { usersControllers } = require('../controllers');
const middlewares = require('../middlewares');

const usersRouter = express.Router();

usersRouter
  .post('/', usersControllers.register)
  .get('/', middlewares.auth(), usersControllers.getAll)
  .delete('/me', middlewares.auth(), usersControllers.deleteUser)
  .get('/test', (req, res) => res.status(200).json(null))
  .get('/:id', middlewares.auth(), usersControllers.getUserById);

module.exports = usersRouter;
