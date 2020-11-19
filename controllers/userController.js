const express = require('express');
const rescue = require('express-rescue');
const { User } = require('../models');
const createJWT = require('../services/createJWT');
const authMiddleware = require('../middlewares/authMiddleware');
const { validateUserData } = require('../services/validateUser');

const router = express.Router();

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const validation = await validateUserData(displayName, email, password);
  if (validation.error) {
    return res.status(validation.status).json({ message: validation.message });
  }

  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }

  const { dataValues } = await User.create({ displayName, email, password, image });
  const token = createJWT(dataValues);
  res.status(201).json({ token });
};

const getUsers = async (_req, res) => {
  const users = await User.findAll({});
  res.status(200).json(users);
};

router.post('/', rescue(createUser));
router.get('/', authMiddleware, rescue(getUsers));

module.exports = router;
