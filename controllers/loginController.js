const { Router } = require('express');
const rescue = require('express-rescue');
const { generateJWT } = require('../middlewares/auth');
const { Users } = require('../models');

const login = Router();

login.post(
  '/',
  rescue(async (req, res) => {
    const { email, password } = req.body;

    if (email === '' || password === '') {
      return res.status(400).json({
        message: `"${email === '' ? 'email' : 'password'}" is not allowed to be empty`,
      });
    }

    if (!email || !password) {
      return res.status(400).json({ message: `"${!email ? 'email' : 'password'}" is required` });
    }

    try {
      const tryLogin = await Users.findAll({ where: { email, password } });
      const existsUser = tryLogin.length > 0;
      if (!existsUser) {
        return res.status(400).json({ message: 'Campos inválidos' });
      }
      const { password: senha, ...data } = tryLogin[0].dataValues;
      // console.log(data);
      const token = generateJWT(data);
      // console.log(token);
      return res.status(201).json({ token });
    } catch (error) {
      console.log(error.message);
    }
  }),
);

module.exports = login;
