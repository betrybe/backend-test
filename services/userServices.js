const { GenerateToken } = require('./JWT');
const { User } = require('../models');
const { ErrHandler } = require('../errors');

const CreateUser = async (payload) => {
  const { displayName, email, password, image } = payload;

  // Validações de nome, email, senha e usuário duplicado
  const nameValidate = ErrHandler.VerifyNameLength(displayName, 8);
  const emailValidate = ErrHandler.VerifyEmail(email);
  const passwordValidate = ErrHandler.VerifyPassword(password, 6);

  if (nameValidate) return nameValidate;
  if (emailValidate) return emailValidate;
  if (passwordValidate) return passwordValidate;

  const duplicateUser = await ErrHandler.VerifyDuplicate(email);
  if (duplicateUser) return duplicateUser;

  // Passando nas validações é inserido no DB e gerado um token com a senha informada.
  await User.create({ displayName, email, password, image });
  const token = GenerateToken({ email, password });

  return { token };
};

const UserLogin = async (payload) => {
  const { email, password } = payload;

  // Validações de email, senha e dados incorretos
  const emailValidate = ErrHandler.VerifyEmail(email);
  const passwordValidate = ErrHandler.VerifyPassword(password, 6);

  if (emailValidate) return emailValidate;
  if (passwordValidate) return passwordValidate;

  const loginValidate = await ErrHandler.VerifyUserLogin(email, password);
  if (loginValidate) return loginValidate;

  // Passando nas validações é gerado o token e devolvido ao usuário.
  const token = GenerateToken({ email, password });

  return { token };
};

const GetUsers = async () => {
  const users = await User.findAll();
  const arrUsers = users.map((user) => user.dataValues);

  return arrUsers;
};

const GetUserById = async (pk) => {
  const user = await User.findByPk(pk);
  if (!user) {
    const error = { error: { status: 404, message: 'Usuário não existe' } };
    return error;
  }

  return user.dataValues;
};

const DeleteUser = async (email) => {
  await User.destroy({ where: { email } });

  return true;
};

module.exports = {
  CreateUser,
  UserLogin,
  GetUsers,
  GetUserById,
  DeleteUser,
};
