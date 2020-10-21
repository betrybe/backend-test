const { Router } = require('express');

const user = Router();

const userRouter = (userController) => {
  user.get('/', userController);

  return user;
};

module.exports = userRouter;
