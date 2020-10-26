const { Router } = require('express');
const rescue = require('express-rescue');
const { generateJWT, validateJWT } = require('../middlewares/auth');
const { Users } = require('../models');

const user = Router();

user.post(
  '/',
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (displayName.length < 8) { res.status(400).json({ message: '"displayName" length must be at least 8 characters long' }); }

    if (email === undefined) res.status(400).json({ message: '"email" is required' });

    if (!email.match(emailRegex)) { res.status(400).json({ message: '"email" must be a valid email' }); }

    if (password.length < 6) { res.status(400).json({ message: '"password" length must be at least 6 characters long' }); }

    if (password === undefined) res.status(400).json({ message: '"password" is required' });

    try {
      const userInfo = await Users.create({ displayName, email, password, image });
      const { password: senha, ...data } = userInfo.dataValues;
      const token = generateJWT(data);

      return res.status(201).json({ token });
    } catch (error) {
      console.log(error.message);
      if (error.message === 'Validation error') res.status(409).json({ message: 'Usuário já existe' });
    }
  }),
);

user.get(
  '/:id',
  validateJWT,
  rescue((req, res) => {
    Users.findByPk(req.params.id, { attributes: { exclude: ['password'] } }).then((foundUser) => {
      if (!foundUser) res.status(404).json({ message: 'Usuário não existe' });
      res.status(200).json(foundUser);
    });
  }),
);

module.exports = user;
