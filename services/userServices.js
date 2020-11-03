const { Users } = require('../models');

const validateName = (name) => {
  if (name && name.length < 8) {
    return {
      ok: false,
      status: 400,
      message: '"displayName" length must be at least 8 characters long',
    };
  }
  return { ok: true };
};

const validadeEmail = async (email) => {
  if (!email) return { ok: false, status: 400, message: '"email" is required' };
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    ? { ok: true }
    : { ok: false, status: 400, message: '"email" must be a valid email' };
};

const validatePassword = (pass) => {
  if (!pass) return { ok: false, status: 400, message: '"password" is required' };
  return pass.length < 6
    ? { ok: false, status: 400, message: '"password" length must be 6 characters long' }
    : { ok: true };
};

const validateImage = (image) => {
  if (image) return { ok: true };
  return { ok: false, status: 400, message: '"image" is required' };
};

const registerUser = async (displayName, email, password, image) => {
  const validEmail = await validadeEmail(email);
  const validName = validateName(displayName);
  const validPassword = validatePassword(password);
  const validImage = validateImage(image);
  switch (false) {
    case validName.ok:
      return validName;
    case validEmail.ok:
      return validEmail;
    case validPassword.ok:
      return validPassword;
    case validImage.ok:
      return validImage;
    default:
      break;
  }
  const createdUser = await Users.create({ displayName, email, password, image })
    .then((res) => ({ ok: true, status: 201, message: 'Usuário válido', res }))
    .catch((err) => ({ ok: false, status: 409, message: 'Usuário já existe', err }));
  return createdUser;
};

const getAllUsers = async () => Users.findAll();

module.exports = { registerUser, getAllUsers };
