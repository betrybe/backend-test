const router = require('express').Router();
const rescue = require('express-rescue');
const { User } = require('../models');

module.exports = (() => {
  router.post(
    '/',
    rescue(async (req, res) => {
      const { displayName, email, password, image } = req.body;
      console.log(displayName);
      const createUser = await User.create({
        displayName,
        email,
        password,
        image,
      });
      res.status(200).json(createUser);
    }),
  );
  return router;
})();
