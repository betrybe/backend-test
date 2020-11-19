const { User } = require('../models');

const createUser = async (displayName, email, password, image) => {
  const verifyUser = await User.findOne({ where: { email } });

  if (verifyUser) return { status: 409, message: 'Usuário já existe' };

  const user = User.create({ displayName, email, password, image });

  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne(
    { where: { email, password } },
    { attributes: { exclude: 'password' } },
  );

  if (!user) return { status: 400, message: 'Campos inválidos' };

  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });

  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne(
    { where: { id } },
    { attributes: { exclude: 'password' } },
  );

  if (!user) return { status: 404, message: 'Usuário não existe' };

  return user;
};

const deleteUser = async (email) => {
  await User.destroy({ where: { email } });

  const user = await User.findOne({ where: { email } });

  if (user) return { status: 400, message: 'Usuário não excluído' };
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
