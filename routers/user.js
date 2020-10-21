const express = require('express');
const { usersControllers } = require('../controllers');
// const middlewares = require('../middlewares');

const usersRouter = express.Router();

usersRouter
  .post('/', usersControllers.register);

module.exports = usersRouter;
