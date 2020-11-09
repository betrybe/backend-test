const { Router } = require('express');
const auth = require('../middlewares/auth');
const { login } = require('../services/userServices');

const loginRoute = Router();

const logIn = async (req, res) => {
  const { email, password } = req.body;
  const logedUser = await login(email, password);
  return logedUser.ok
    ? res.status(logedUser.status).json({ token: logedUser.token })
    : res.status(logedUser.status).json({ message: logedUser.message });
};

loginRoute.route('/').post(auth(false), logIn);

module.exports = loginRoute;
