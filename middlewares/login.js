const rescue = require('express-rescue');
const Boom = require('boom');

const { Token, User } = require('../services');

module.exports = rescue(async (req, res, next) => {
  const { email, password } = req.body;

  const { message } = await User.validateUserLogin({ email, password });
  if (message) return next(Boom.badRequest(message));

  const user = await User.getUserByEmail(email);

  if (user.message) return next(Boom.badRequest('Campos inválidos'));

  const { password: p, ...filteredUser } = user;
  // p apenas para não confitar com a variavel que vem de req

  try {
    const token = Token.generate(filteredUser);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status.json({ message: 'algo deu errado' });
  }
});
