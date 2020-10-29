const { users } = require('../models');
const { createToken } = require('../services');
const { userService } = require('../services');
const { errors } = require('../services');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  if (!email) {
    return res.status(400).json(errors.errorEmailReq);
  }
  if (!password) {
    return res.status(400).json(errors.errorPasswordReq);
  }
  if (!userService.validateName(displayName)) {
    return res.status(400).json(errors.errorName);
  }
  if (password.length < 6) {
    return res.status(400).json(errors.errorPassword);
  }
  if (userService.validateEmail(email)) {
    return res.status(400).json(errors.errorEmail);
  }
  if (await userService.checkUserExist(email)) {
    return res.status(409).json(errors.errorUserExist);
  }

  const newUser = await users.create({ displayName, email, password, image });

  const token = await createToken({ newUser });

  return res.status(201).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (userService.checkEmailEmpty(email)) {
    return res.status(400).json(errors.emailNull);
  }
  if (userService.checkPasswordEmpty(password)) {
    return res.status(400).json(errors.passwordNull);
  }
  if (!email) {
    return res.status(400).json(errors.errorEmailReq);
  }
  if (!password) {
    return res.status(400).json(errors.errorPasswordReq);
  }
  if (!(await userService.checkUserDb(email, password))) {
    return res.status(400).json(errors.loginInvalid);
  }

  const token = await createToken({ email, password });
  return res.status(200).json({ token });
};
module.exports = {
  createUser,
  login,
};
