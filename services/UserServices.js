const { GenerateToken } = require('./JWT');
const { User } = require('../models');
const err = require('../errors');

const CreateUser = async (payload) => {
  const { displayName, email, password, image } = payload;

  //* Validações de parâmetros
  const NameErr = err.ErrHandler.VerifyNameLength(displayName, 8);
  const EmailErr = err.ErrHandler.VerifyEmail(email);
  const PassErr = err.ErrHandler.VerifyPassword(password, 6);

  if (NameErr) return NameErr;
  if (EmailErr) return EmailErr;
  if (PassErr) return PassErr;

  //* Validação de usuário duplicado
  const duplicateErr = await err.ErrHandler.VerifyDuplicate(email);
  if (duplicateErr) return duplicateErr;

  //* Passando nas validações é inserido no DB e gerado um token com a senha informada.
  await User.create({ displayName, email, password, image });
  const token = GenerateToken({ email, password });
  return { token };
};

const UserLogin = async (payload) => {
  const { email, password } = payload;

  //* Validações de parâmetros
  const EmailErr = err.ErrHandler.VerifyEmail(email);
  const PassErr = err.ErrHandler.VerifyPassword(password, 6);

  if (EmailErr) return EmailErr;
  if (PassErr) return PassErr;

  //* Validação de dados de login incorretos
  const LoginErr = await err.ErrHandler.VerifyUserLogin(email, password);
  if (LoginErr) return LoginErr;

  //* Passando nas validações é gerado o token e devolvido ao usuário.
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
