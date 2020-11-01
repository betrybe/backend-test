const { User } = require('../models');

const VerifyNameLength = (name) => {
  if (name.length < 8) {
    const error = {
      error: {
        status: 400,
        message: '"displayName" length must be at least 8 characters long',
      },
    };
    return error;
  }
  return false;
};

const VerifyEmail = (email) => {
  if (email === '') {
    const error = {
      error: {
        status: (400),
        message: '"email" is not allowed to be empty',
      },
    };
    return error;
  }
  if (!email) {
    const error = {
      error: {
        status: 400,
        message: '"email" is required',
      },
    };
    return error;
  }
  const ValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!ValidEmail.test(email)) {
    const error = {
      error: {
        status: 400,
        message: '"email" must be a valid email',
      },
    };
    return error;
  }
  return false;
};

const VerifyPassword = (password, length) => {
  if (password === '') {
    const error = { error: { status: 400, message: '"password" is not allowed to be empty' } };
    return error;
  }
  if (!password) {
    const error = { error: { status: 400, message: '"password" is required' } };
    return error;
  }
  if (password.length < length) {
    const error = {
      error: {
        status: 400,
        message: '"password" length must be 6 characters long',
      },
    };
    return error;
  }
};

const VerifyDuplicate = async (email) => {
  const UserFound = await User.findAll({ where: { email } });
  if (UserFound.length) {
    const error = { error: { status: 409, message: 'Usuário já existe' } };
    return error;
  }
  return false;
};

const VerifyUserLogin = async (email, password) => {
  const UserFound = await User.findAll({ where: { email, password } });
  if (!UserFound.length) {
    const error = { error: { status: 400, message: 'Campos inválidos' } };
    return error;
  }
  return false;
};

const VerifyTitle = (title) => {
  if (!title) {
    const titleError = { error: { status: 400, message: '"title" is required' } };
    return titleError;
  }
  return false;
};

const VerifyContent = (content) => {
  if (!content) {
    const contentError = { error: { status: 400, message: '"content" is required' } };
    return contentError;
  }
  return false;
};

const VerifyPost = (post, user) => {
  if (post.dataValues.userId !== user.dataValues.id) {
    const errorPost = { error: { status: 401, message: 'Usuário não autorizado' } };
    return errorPost;
  }
  return false;
};

module.exports = {
  VerifyNameLength,
  VerifyEmail,
  VerifyPassword,
  VerifyDuplicate,
  VerifyUserLogin,
  VerifyTitle,
  VerifyContent,
  VerifyPost,
};
