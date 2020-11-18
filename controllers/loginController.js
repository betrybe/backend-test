const { Router } = require('express');
const { User } = require('../models');
const { createToken } = require('../middlewares');

const login = Router();

login.post('/',
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      console.log('o que vem aqui:', req.body);
      if (email === undefined) {
        res.status(400).json({ message: '"email" is required' });
        throw new Error();
      }
      if (email === '') {
        res.status(400).json({ message: '"email" is not allowed to be empty' });
        throw new Error();
      }
      if (password === undefined) {
        res.status(400).json({ message: '"password" is required' });
        throw new Error();
      }
      if (password === '') {
        res.status(400).json({ message: '"password" is not allowed to be empty' });
        throw new Error();
      } else {
        const logData = await User.findOne(
          {
            where: { email, password },
          });
        if (!logData) {
          res.status(400).json({ message: 'Campos inválidos' });
          throw new Error();
        } else {
          return res.status(200).json(createToken(password, email));
        }
      }
    } catch (error) {
      console.error('erro aqui', error);
      res.status(400);
      return next(error);
    }
  });

module.exports = login;
