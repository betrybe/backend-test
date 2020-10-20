const rescue = require('express-rescue');
const Boom = require('boom');
const { User } = require('../services');

const register = rescue(
  async (req, res, next) => {
    const { displayName, email, image, password } = req.body;
    console.log('passou por ak', displayName, email, image, password);

    const { message: validateMessage, value } = await User.validateUser({ displayName, email, password });

    console.log('passou por ak', value, validateMessage);

    if (validateMessage) return next(Boom.badData(validateMessage));

    const { message } = await User.isEmailAvaible(email);

    if (message) return next(Boom.conflict(message));

    const user = await User.createUser({ displayName, email, image, password });

    return res.status(200).json({ ...user });
  },
);

module.exports = {
  register,
};
