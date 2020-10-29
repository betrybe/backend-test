const errorName = { message: '"displayName" length must be at least 8 characters long' };
const errorEmail = { message: '"email" must be a valid email' };
const errorEmailReq = { message: '"email" is required' };
const errorPassword = { message: '"password" length must be 6 characters long' };
const errorPasswordReq = { message: '"password" is required' };
const errorUserExist = { message: 'Usuário já existe' };
const emailNull = { message: '"email" is not allowed to be empty' };
const passwordNull = { message: '"password" is not allowed to be empty' };
const loginInvalid = { message: 'Campos inválidos' };

module.exports = {
  errorName,
  errorEmail,
  errorEmailReq,
  errorPassword,
  errorPasswordReq,
  errorUserExist,
  emailNull,
  passwordNull,
  loginInvalid,
};
