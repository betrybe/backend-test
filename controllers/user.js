const rescue = require('express-rescue');

const register = ({ User }) => rescue(async (req, res) => {
  const { displayName, email, image, password } = req.body;

  const { dataValues } = await User.create({ displayName, email, image, password });

  const { password: p, ...user } = dataValues;

  return res.status(200).json({ ...user });
});

module.exports = {
  register,
};
