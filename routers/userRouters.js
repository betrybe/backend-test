const router = require('express').Router();
const { User } = require('../models');
const createToken = require('../utils/createToken');

module.exports = (() => {
  router.post('/', async (req, res) => {
    try {
      const { displayName, email, password, image } = req.body;
      const createUser = await User.create({
        displayName,
        email,
        password,
        image,
      });
      console.log(createUser);
      const token = createToken({ displayName, email, image });
      return res.status(201).json({ token });
    } catch (error) {
      return res.status(409).json({ error });
    }
  });
  return router;
})();
