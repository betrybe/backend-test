const { tokenValid } = require('./jwt');
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
module.exports = {
  CreateUser,
};
