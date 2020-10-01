const jwt = require('jsonwebtoken');
const error = require('../services/errorScheme');
const userControllers = require('../controllers/userControllers');
const { Users } = require('../models');

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) throw new error.TokenNotFound();

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const { data: { id } } = decoded;

  const user = await Users.findByPk(id)
    .then((data) => data.dataValues)
    .catch((err) => {
      throw new error.GeneralError(err);
    });
  
  if (!user) throw new error.UserNotFound();

  req.user = user;
  
  next();
};

module.exports = {
  validateJWT,
};
