const { users } = require('../models');
const { createToken } = require('../services');
const { userService } = require('../services');
const { errors } = require('../services');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  if (!userService.validateName(displayName)) {
    return res.status(400).json(errors.errorName);
  }
  if (!email) {
    return res.status(400).json(errors.errorEmailReq);
  }
  if (!userService.validateEmail(email)) {
    return res.status(400).json(errors.errorEmail);
  }
  if (!userService.validatePassword(password)) {
    return res.status(400).json(errors.errorPassword);
  }
  if (!password) {
    return res.status(400).json(errors.errorPasswordReq);
  }
  if (await userService.checkUserExist(email)) {
    return res.status(409).json(errors.errorUserExist);
  }

  const newUser = await users.create({ displayName, email, password, image });

  const token = await createToken({ newUser });

  return res.status(201).json({ token });
};

module.exports = {
  createUser,
};
