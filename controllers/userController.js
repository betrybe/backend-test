// const Joi = require('joi');
const rescue = require('express-rescue');

// const validateUser = Joi.object({
//   displayName: Joi.string().length(8),
//   email: Joi.string().email().required(),
//   password: Joi.string().length(8).required(),
// });

const createUser = (service) => rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await service.createUser(displayName, email, password, image);
  console.log(user);
  res.status(201).json(user);
});

const getUserController = (service) => ({
  createUser: createUser(service),
});

module.exports = { getUserController };
