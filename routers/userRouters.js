const router = require('express').Router();
const { User } = require('../models');
const createToken = require('../utils/createToken');
const validateToken = require('../utils/validateToken');

module.exports = (() => {
  router.post('/', async (req, res, next) => {
    try {
      const { displayName, email, password, image } = req.body;
      const createUser = await User.create({
        displayName,
        email,
        password,
        image,
      });
      if (createUser) {
        const token = createToken({ email });
        req.token = token;
        return res.status(201).json({ token });
      }
    } catch (error) {
      next(error);
    }
  });
  router.get('/', validateToken, (req, res) => {
    User.findAll({ attributes: { exclude: ['password'] } })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((_e) => {
        res.status(401).json({ message: 'Token não encontrado' });
      });
  });
  return router;
})();
