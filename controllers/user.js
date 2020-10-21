const rescue = require('express-rescue');
const Boom = require('boom');
const { User, Token } = require('../services');

const register = rescue(async (req, res, next) => {
  const { displayName, email, image, password } = req.body;

  const { message } = await User.validateUserRegister({ email, password, displayName });

  if (message) return next(Boom.badRequest(message));

  const { message: errMessageEmail } = await User.isEmailAvaible(email);

  if (errMessageEmail) return next(Boom.conflict(errMessageEmail));

  const user = await User.createUser({ displayName, email, image, password });

  try {
    const token = Token.generate(user);

    return res.status(201).json({ token });
  } catch (err) {
    return res.status.json({ message: 'algo deu errado' });
  }
});

module.exports = {
  register,
};
