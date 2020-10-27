const errorName = { message: '"displayName" lenght must be at least 8 characters long' };
const errorEmail = { message: '"email" must be a valid email' };
const errorEmailReq = { message: '"email" id required' };
const errorPassword = { message: '"password" lenght must be 6 characters long' };
const errorPasswordReq = { message: '"password" is required' };
const errorUserExist = { message: 'usuário já existe' };

module.exports = {
  errorName,
  errorEmail,
  errorEmailReq,
  errorPassword,
  errorPasswordReq,
  errorUserExist,
};
