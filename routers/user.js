const express = require('express');
const { usersControllers } = require('../controllers');

const usersRouter = express.Router();

module.exports = (models) => {
  usersRouter
    .post('/', usersControllers.register(models));

  return usersRouter;
};
