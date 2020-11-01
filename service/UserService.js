const { tokenValid } = require('../authmiddleware/jwt');
const { User } = require('../models');
const err = require('../errors');

const CreateUser = async (payload) => {
  const { displayName, email, password, image } = payload;
  const NameErr = err.ErrHandler.VerifyNameLength(displayName);
  const EmailErr = err.ErrHandler.VerifyEmail(email);
  const PassErr = err.ErrHandler.VerifyPassword(password, 6);
  if (NameErr) return NameErr;
  if (EmailErr) return EmailErr;
  if (PassErr) return PassErr;

  const duplicateErr = await err.ErrHandler.VerifyDuplicate(email);
  if (duplicateErr) return duplicateErr;

  await User.create({ displayName, email, password, image });
  const token = tokenValid({ email, password });
  return { token };
};

const GetUsers = async () => {
  const getAll = await User.findAll();
  return getAll;
};

const getUserbyId = async (id) => {
  const userById = await User.findByPk(id);
  if (!userById) {
    const userErroId = { error: { status: 404, message: 'Usuário não existe' } };
    return userErroId;
  }
  return userById;
};

const deleteMyUser = async (email) => {
  await User.destroy({ where: { email } });
  return true;
};

module.exports = {
  CreateUser,
  GetUsers,
  getUserbyId,
  deleteMyUser,
};
