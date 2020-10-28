const errorName = { message: '"displayName" length must be at least 8 characters long' };
const errorEmail = { message: '"email" must be a valid email' };
const errorEmailReq = { message: '"email" is required' };
const errorPassword = { message: '"password" length must be 6 characters long' };
const errorPasswordReq = { message: '"password" is required' };
const errorUserExist = { message: 'Usuário já existe' };

module.exports = {
  errorName,
  errorEmail,
  errorEmailReq,
  errorPassword,
  errorPasswordReq,
  errorUserExist,
};
