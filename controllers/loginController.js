const { Router } = require('express');
const { User } = require('../models');
const { createToken } = require('../middlewares');

const user = Router();

user.post('/',
  async (req, res, next) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      const userLog = await User.findOne({
        where: { email, password },
      });
      if (!userLog) {
        res.status(400).json({ message: 'Campos inválidos' });
      }
      else {
        res.json(createToken(userLog.id, email))
      }
    } catch (error) {
      console.error('erro aqui', error);
      return next(error);
    }
  },
);

module.exports = user;
