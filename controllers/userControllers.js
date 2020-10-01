const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { userValidation } = require('../services/joiValidation');
const error = require('../services/errorScheme');
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
          throw new error.UserAlreadyRegistered();
        }
        throw new error.GeneralError(err);
      });
  })
  .catch((err) => {
    throw new error.CommonValidationError(err);
  }));

const findAllUsers = rescue(async (req, res) =>
  Users.findAll().then(
    (users) => {
      if (!users) throw new error.UserNotFound();
      return res.status(200).json(users);
    },
  )
    .catch((err) => {
      throw new error.GeneralError(err);
    }));

const findUserById = rescue(async (req, res) =>
  Users.findByPk(req.params.id).then(
    (user) => {
      if (!user) throw new error.UserNotFound();
      res.status(200).send(user);
    },
  )
    .catch((err) => {
      throw new error.GeneralError(err);
    }));

module.exports = {
  findAllUsers,
  addUser,
  findUserById,
};
