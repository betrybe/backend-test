const { tokenValid } = require('../authmiddleware/jwt');
const err = require('../errors');

const UserLogin = async (payload) => {
  const { email, password } = payload;

  const EmailErr = err.ErrHandler.VerifyEmail(email);
  const PassErr = err.ErrHandler.VerifyPassword(password, 6);

  if (EmailErr) return EmailErr;
  if (PassErr) return PassErr;

  const LoginErr = await err.ErrHandler.VerifyUserLogin(email, password);
  if (LoginErr) return LoginErr;

  const token = tokenValid({ email, password });
  return { token };
};

module.exports = {
  UserLogin,
};
