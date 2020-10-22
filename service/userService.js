const userService = require("../../B31-TryBeer/back-end/services/userService");
const validateUser = require("../middlewares/validata");
const createUser = require("../models/Users")

const errSpecific = (msg) => {
  return {
    code: 400,
    msg,
  }
};

const errConflict = {
  code: 409,
  message: 'Usuário já existe',
};

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createUser = async (data) => {
  if (validateUser(data)) return errSpecific(validateUser.message);
  return createUser(data);
}

module.exports = createUser;
