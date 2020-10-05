const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const CustomError = require('../services/errorScheme');

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) throw new CustomError({ message: 'Token não encontrado', code: 401 });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const { data: { id } } = decoded;

  const user = await Users.findByPk(id)
    .then((data) => data && data.dataValues)
    .catch((err) => {
      throw new CustomError({ message: err.message, code: 404 });
    });

  if (!user) throw new CustomError({ message: 'Usuário ou token não reconhecido', code: 403 });

  req.user = user;

  next();
};

module.exports = {
  validateJWT,
};
