const { Router } = require('express');
const { User } = require('../models');
const { createToken } = require('../middlewares');

const user = Router();

user.post('/',
  async (req, res, next) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;
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
      }
      const userLog = await User.findOne({
        where: { email, password },
      });
      if (!userLog) {
        res.status(400).json({ message: 'Campos inválidos' });
      } else {
        res.json(createToken(userLog.id, email));
      }
    } catch (error) {
      console.error('erro aqui', error);
      return next(error);
    }
  });

module.exports = user;
