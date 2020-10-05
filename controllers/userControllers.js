const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const CustomError = require('../services/errorScheme');
const { userValidation } = require('../services/joiValidation');
const { Users } = require('../models');

const jwtConfig = {
  expiresIn: '3h',
  algorithm: 'HS256',
};

const token = (user) => jwt.sign({ data: user }, process.env.SECRET_KEY, jwtConfig);

const addUser = rescue(async (req, res) => userValidation.validateAsync(req.body)
  .then(async () => {
    const { body: { displayName, email, password, image } } = req;
    return Users.create({ displayName, email, password, image })
      .then((user) => {
        const newToken = token(user.dataValues);
        return res.status(201).send({ token: newToken });
      })
      .catch((err) => {
        if (err.parent && err.parent.errno === 1062) {
          throw new CustomError({ message: 'Usuário já registrado', status: 400 });
        }
        throw new CustomError({ message: err.message, status: 500 });
      });
  })
  .catch(({ message }) => {
    throw new CustomError({ message, status: 400 });
  }));

const findAllUsers = rescue(async (req, res) =>
  Users.findAll().then(
    (users) => {
      if (!users) throw new CustomError({ message: 'Usuário não encontrado', status: 404 });
      return res.status(200).json(users);
    },
  )
    .catch((err) => {
      throw new CustomError({ message: err.message, status: 500 });
    }));

const findUserById = rescue(async (req, res) =>
  Users.findOne({ where: { id: req.params.id } }).then(
    (user) => {
      if (!user) throw new CustomError({ message: 'Usuário não encontrado', status: 404 });
      res.status(200).send(user);
    },
  )
    .catch((err) => {
      throw new CustomError({ message: err.message, status: 500 });
    }));

module.exports = {
  findAllUsers,
  addUser,
  findUserById,
};
