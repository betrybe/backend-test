const express = require('express');

const usersRouter = express.Router();

const makeRouter = ({ usersControllers }, middlewares) => {
  usersRouter
    .post('/', usersControllers.register)
    .get('/', middlewares.auth(), usersControllers.getAll)
    .delete('/me', middlewares.auth(), usersControllers.deleteUser)
    .get('/:id', middlewares.auth(), usersControllers.getUserById);
  return usersRouter;
};

module.exports = makeRouter;
