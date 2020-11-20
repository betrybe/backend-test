const { Router } = require('express');
const { User } = require('../models');
const { createToken, verifyToken } = require('../middlewares');

const user = Router();

user.post('/',
  async (req, res, next) => {
    try {
      console.log(req.body);
      const { displayName, email, password, image } = req.body;
      const userCreate = await User.create({
        displayName, email, password, image,
      });
      if (!userCreate) {
        res.status(400).json({ message: 'Campos inválidos' });
      } else {
        return res.status(201).json(createToken(userCreate.id, email));
      }
    } catch (err) {
      console.log('erro =', err.name);
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          message: err.errors[0].message,
        });
      }
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
          sucess: false,
          message: 'Usuário já existe',
        });
      }
      return next(err);
    }
  });

user.get('/', verifyToken,
  async (req, res, next) => {
    try {
      const userAll = await User.findAll();
      return res.status(200).json(userAll.map((e) => e.dataValues));
    } catch (err) {
      return next(err);
    }
  });

user.get('/:id', verifyToken,
  async (req, res, next) => {
    try {
      const userId = await User.findOne({ where: { id: req.params.id } });
      if (!userId) return res.status(404).json({ message: 'Usuário não existe' });
      return res.status(200).json(userId.dataValues);
    } catch (err) {
      return next(err);
    }
  });

user.delete('/me', verifyToken,
  async (req, res, next) => {
    console.log('cheguei aqui:', req.user);
    try {
      await User.destroy({ where: { email: req.user.email } });
      return res.status(204).json();
    } catch (err) {
      return next(err);
    }
  });

module.exports = user;
