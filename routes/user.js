const { Router } = require('express');
const userController = require('../controllers/user');

const user = Router();

user.post('/', userController.createUser);

module.exports = user;
