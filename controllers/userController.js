const express = require('express');
const rescue = require('express-rescue');
const { User } = require('../models');
const createJWT = require('../services/createJWT');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { dataValues } = await User.create({ displayName, email, password, image });

  const token = createJWT(dataValues);
  res.status(201).json({ token });
};

const getUser = async (req, res) => {
  const users = await User.findAll({});
  res.status(200).json(users);
};

router.get('/', authMiddleware, rescue(getUser));
router.post('/', rescue(createUser));

module.exports = router;
