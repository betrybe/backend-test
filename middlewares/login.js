const rescue = require('express-rescue');
const boom = require('@hapi/boom');

const { Token, User } = require('../services');

module.exports = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const { message } = await User.validateUserLogin({ email, password });
  if (message) return next(boom.badRequest(message));

  const user = await User.getUserByEmail(email);

  if (user.message) return next(boom.badRequest('Campos inválidos'));

  const { password: pass, ...filteredUser } = user;

  try {
    const token = Token.generate(filteredUser);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status.json({ message: 'DEU RUIM!' });
  }
});
