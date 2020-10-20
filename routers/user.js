const express = require('express');
const { usersControllers } = require('../controllers');
const middlewares = require('../middlewares');

const usersRouter = express.Router();

usersRouter
  .post('/', usersControllers.validate('register'), usersControllers.register, middlewares.login(201));

module.exports = usersRouter;
