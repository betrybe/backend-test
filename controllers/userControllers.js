const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const CustomError = require('../services/errorScheme');
const { userValidation, loginValidation } = require('../services/joiValidation');
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
          throw new CustomError({ message: 'Usuário já registrado', code: 400 });
        }
        throw new CustomError({ message: err.message, code: 500 });
      });
  })
  .catch(({ message }) => {
    throw new CustomError({ message, code: 400 });
  }));

const findAllUsers = rescue(async (req, res) =>
  Users.findAll().then(
    (users) => {
      if (!users) throw new CustomError({ message: 'Usuário não encontrado', code: 404 });
      return res.status(200).send(users);
    },
  )
    .catch((err) => {
      throw new CustomError({ message: err.message, code: 500 });
    }));

const findUserById = rescue(async (req, res) =>
  Users.findOne({ where: { id: req.params.id } }).then(
    (user) => {
      if (!user) throw new CustomError({ message: 'Usuário não encontrado', code: 404 });
      res.status(200).send(user);
    },
  )
    .catch((err) => {
      throw new CustomError({ message: err.message, code: 404 });
    }));

const deleteUser = rescue(async (req, res) => {
  const { user: { id } } = req;
  if (!id) throw new CustomError({ message: 'Usuário não encontrado', code: 404 });
  return Users.destroy({ where: { id } })
    .then((data) => {
      if (data === 1) return res.status(200).send('Usuário deletado.');
      throw new CustomError({ message: 'Usuário não encontrado', code: 404 });
    })
    .catch((err) => {
      throw new CustomError({ message: err.message, code: 500 });
    });
});

const login = rescue(async (req, res) => loginValidation.validateAsync(req.body)
  .then(() => {
    Users.findOne({ where: { email: req.body.email } }).then((data) => {
      if (!data) throw new CustomError({ message: 'Usuário não encontrado', code: 404 });
      if (data && data.dataValues) {
        const newToken = token(data.dataValues);
        return res.status(200).send({ token: newToken });
      }
      throw new CustomError({ message: 'Usuário não encontrado', code: 404 });
    });
  })
  .catch(() => {
    throw new CustomError({ message: 'Campos inválidos', code: 400 });
  }));

module.exports = {
  findAllUsers,
  addUser,
  findUserById,
  deleteUser,
  login,
};
