const { GenerateToken } = require('./JWT');
const { User } = require('../models');

const CreateUser = async (payload) => {
  const { displayName, email, password, image } = payload;
  //todo criar as validações
  //todo criar handler de error

  //* Passando nas validações é inserido no DB e gerado um token com a senha informada.
  await User.create({ displayName, email, password, image });
  const token = GenerateToken(password);
  return token;
};

module.exports = {
  CreateUser,
};
