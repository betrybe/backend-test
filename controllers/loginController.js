const express = require('express');
const rescue = require('express-rescue');
const { User } = require('../models');
const createJWT = require('../services/createJWT');
const { validateLoginData } = require('../services/validateUser');

const router = express.Router();

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const validation = await validateLoginData(email, password);
  if (validation.error) {
    return res.status(validation.status).json({ message: validation.message });
  }

  const dataValues = await User.findOne({ where: { email, password } });
  if (!dataValues) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }
  const token = createJWT(dataValues);
  res.status(200).json({ token });
};

router.post('/', rescue(userLogin));

module.exports = router;
