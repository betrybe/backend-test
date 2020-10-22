const router = require('express').Router();
const { User } = require('../models');
const createToken = require('../utils/createToken');

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
  return router;
})();
