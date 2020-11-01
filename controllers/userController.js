const express = require('express');
const rescue = require('express-rescue');
const { User } = require('../models');
const createJWT = require('../services/createJWT');
const authMiddleware = require('../middlewares/authMiddleware');
// const validateUserData = require('../services/validateUser');

const router = express.Router();

const validateEmail = (email) => {
  const regex = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const validateUserData = (displayName, email, password) => {
  switch (true) {
    case (displayName.length < 8):
      return { error: true, status: 400, message: '”displayName” length must be at least 8 characters long' };
    case (!validateEmail(email)):
      return { error: true, status: 400, message: '”email” must be a valid email' };
    case (!email):
      return { error: true, status: 400, message: '”email” is required' };
    case (password.length < 6):
      return { error: true, status: 400, message: '”password” length must be at least 6 characters long' };
    case (!password):
      return { error: true, status: 400, message: '”password” is required' };
    default:
      return { error: false };
  }
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  // const emailExists = await User.findOne({ where: { email } });
  // if (emailExists) return { error: true, status: 409, message: 'Usuário já existe' };

  const validation = await validateUserData(displayName, email, password);
  if (validation.error) return validation;

  const { dataValues } = await User.create({ displayName, email, password, image });
  const token = createJWT(dataValues);
  res.status(201).json({ token });
};

const getUser = async (_req, res) => {
  const users = await User.findAll({});
  res.status(200).json(users);
};

router.post('/', rescue(createUser));
router.get('/', rescue(getUser));

module.exports = router;
