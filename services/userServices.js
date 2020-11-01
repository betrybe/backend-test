const { Users } = require('../models');

const validateName = (name) => name && name.length < 8
  ? {
      ok: false,
      status: 400,
      message: '"displayName" length must be at least 8 characters long',
    }
  : { ok: true }

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

const validateImage = (image) => image
  ? { ok: true }
  : { ok: false, status: 400, message: '"image" is required' };

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
      let duplicate = false;
      const createdUser = await Users.create({ displayName, email, password, image })
      .catch(() => duplicate = true);
      if (duplicate) return { ok: false, status: 409, message: 'Usuário já existe' };
      return { ok: true, status: 201, message: 'Usuário válido', createdUser };
  }
};

const getAllUsers = async () => {
  return User.findAll();
};

module.exports = { registerUser, getAllUsers };
