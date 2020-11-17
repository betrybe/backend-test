const { Router } = require('express');
const { User } = require('../models');
const { createToken } = require('../middlewares');

const user = Router();

user.post('/',
  async (req, res, next) => {
    try {
      console.log(req.body);
      const { displayName, email, password, image } = req.body;
      const userCreate = await User.create({
        displayName, email, password, image
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
          })
        }
        if(err.name === 'SequelizeUniqueConstraintError' ) {
            return res.status(409).json({
                sucess: false,
                message: 'Usuário já existe',
            });
        } else {
         return next(err);
        }
    }
  });

module.exports = user;