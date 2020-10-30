const { Users } = require('../models');

const duplicateUser = async (email) => {
  if (email) {
    return Users.findOne({ where: { email } });
  }
  return;
};

const validateRegister = async (name, email, password, image) => {
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const duplicate = await duplicateUser(email);
  switch (true) {
    case !email:
      return { ok: false, status: 400, message: '"email" is required' };
    case !password:
      return { ok: false, status: 400, message: '"password" is required' };
    case !image:
      return { ok: false, status: 400, message: '"image" is required' };
    case name.length < 8:
      return {
        ok: false,
        status: 400,
        message: '"displayName" length must be at least 8 characters long',
      };
    case password.length < 6:
      return { ok: false, status: 400, message: '"password" length must be 6 characters long' };
    case !validEmail:
      return { ok: false, status: 400, message: '"email" must be a valid email' };
    case duplicate && duplicate.Users:
      return { ok: false, status: 409, message: 'Usuário já existe' };
    default:
      return { ok: true, status: 201, message: 'Usuário válido' };
  }
};

const registerUser = async (displayName, email, password, image) => {
  const isValidUser = await validateRegister(displayName, email, password, image);
  if (isValidUser.ok) {
    const createdUser = await Users.create({ displayName, email, password, image });
    isValidUser.user = createdUser;
    return isValidUser;
  }
  return isValidUser;
};

const getAllUsers = async () => {
  return User.findAll();
};

module.exports = { registerUser, getAllUsers };
