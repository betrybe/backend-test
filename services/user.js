const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) =>
  User.create({ displayName, email, password, image });

const userLogin = async (request) => {
  const { email, password } = request;
  if (typeof email === 'string' && email.length === 0) {
    return { errors: [{ auth: false, message: '"email" is not allowed to be empty' }] };
  }
  if (typeof password === 'string' && password.length === 0) {
    return { errors: [{ auth: false, message: '"password" is not allowed to be empty' }] };
  }
  if (!email) return { errors: [{ auth: false, message: '"email" is required' }] };
  if (!password) return { errors: [{ auth: false, message: '"password" is required' }] };
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password.toString()) {
    return { errors: [{ auth: false, message: 'Campos inválidos' }] };
  }
  return user;
};

module.exports = { createUser, userLogin };
