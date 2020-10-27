const { Router } = require('express');
const models = require('../models');

const login = Router();

const { getUserService } = require('../services/userService');
const { getUserController } = require('../controllers/userController');

const userService = getUserService(models);
const userController = getUserController(userService);

login.post('/', userController.getUser);

module.exports = login;
