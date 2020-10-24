const rescue = require('express-rescue');
const { userRegister } = require('../services/userService');
const createToken = require('../token/createToken');

const createUser = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const response = await userRegister(displayName, email, password, image);

  if (response.error) {
    return res.status(response.error.status).json({ message: response.error.message });
  }

  const token = createToken(displayName, email, image);

  return res.status(201).json({ token });
});

module.exports = {
  createUser,
};
