const express = require('express');
const { usersControllers } = require('../controllers');

const usersRouter = express.Router();

module.exports = ({ User }) => {
  usersRouter
    .post('/', usersControllers.register(User));

  return usersRouter;
};
