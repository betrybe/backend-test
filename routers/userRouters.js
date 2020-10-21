const router = require('express').Router();
const { User } = require('../models');
const createToken = require('../utils/createToken');

module.exports = (() => {
  router.post('/', async (req, res, next) => {
    try {
      const { displayName, email, password, image } = req.body;
      await User.create({
        displayName,
        email,
        password,
        image,
      });
      const token = createToken({ displayName, email, image });
      return res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  });
  return router;
})();
