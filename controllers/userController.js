const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const { User, Token } = require('../services');

const register = rescue(async (req, res, next) => {
  const { displayName, email, image, password } = req.body;

  const { message } = await User.validateUserRegister({ email, password, displayName });

  if (message) return next(boom.badRequest(message));

  const { message: errMessageEmail } = await User.isEmailAvaible(email);

  if (errMessageEmail) return next(boom.conflict(errMessageEmail));

  const user = await User.createUser({ displayName, email, image, password });

  try {
    const token = Token.generate(user);

    return res.status(201).json({ token });
  } catch (err) {
    return res.status.json({ message: 'algo deu errado' });
  }
});

const getUserByEmail = rescue(async (req, res, next) => {
  const { email } = req.body;

  const { message } = await User.validateUserEmail({ email });

  if (!message) return next(boom.badRequest(message));

  const user = await User.getUserByEmail(email);

  if (!user) return boom.notFound('Usuário não encontrado');

  return res.status(200).json({ ...user });
});

const getUserById = rescue(async (req, res, next) => {
  const { id } = req.body;

  const user = await User.getUserById(id);

  if (user.message) return next(boom.notFound('Usuário não existe'));

  return res.status(200).json({ ...user });
});

const getAll = rescue(async (_req, res) => {
  const users = await User.getAllUsers();
  console.log('users', users);
  return res.status(200).json(users);
});

const deleteUser = rescue(async (req, res) => {
  const { id } = req.user;
  await User.deleteUser(id);
  res.status(204).end();
});

module.exports = {
  register,
  getUserByEmail,
  getUserById,
  getAll,
  deleteUser,
};
