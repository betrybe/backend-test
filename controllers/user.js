const rescue = require('express-rescue');
const Boom = require('boom');

const register = ({ createUser, validateUser, isEmailAvaible }) => rescue(
  async (req, res, next) => {
    const { displayName, email, image, password } = req.body;

    const { message: validateMessage } = await validateUser({ displayName, email, password });

    if (validateMessage) return next(Boom.badData(validateMessage));

    const { message } = await isEmailAvaible(email);

    if (message) return next(Boom.conflict(message));

    const user = await createUser({ displayName, email, image, password });

    return res.status(200).json({ ...user });
  },
);

module.exports = {
  register,
};
