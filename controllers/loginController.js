const rescue = require('express-rescue');
const createToken = require('../token/createToken');
const { validateLogin } = require('../services/loginService');

const makeLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const response = await validateLogin(email, password);

  if (response.error) {
    return res.status(response.error.status).json({ message: response.error.message });
  }

  const token = createToken(email);
  return res.status(200).json({ token });
});

module.exports = {
  makeLogin,
};
