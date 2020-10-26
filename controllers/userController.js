// const Joi = require('joi');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mirellasproject';

// const validateUser = Joi.object({
//   displayName: Joi.string().length(8),
//   email: Joi.string().email().required(),
//   password: Joi.string().length(8).required(),
// });

const createUser = (service) => rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await service.createUser(displayName, email, password, image);

  const jwtConfig = { expiresIn: '50min', algorithm: 'HS256' };
  const token = jwt.sign({ user }, JWT_SECRET, jwtConfig);

  res.status(201).json({ token });
});

const getUserController = (service) => ({
  createUser: createUser(service),
});

module.exports = { getUserController };
