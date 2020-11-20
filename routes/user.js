const { Router } = require('express');
const { user: userController } = require('../controllers');
const { auth } = require('../middlewares');

const user = Router();

user
  .route('/')
  .get(auth, userController.getAll)
  .post(userController.createUser);

user.get('/:id', auth, userController.getById);

user.delete('/me', auth, userController.deleteUser);

module.exports = user;
