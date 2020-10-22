const { Op } = require('sequelize');
const { User } = require('../models');
const createToken = require('../utils/createToken');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const searchUser = await User.findOne({
    where: {
      [Op.and]: [
        { email: { [Op.eq]: email } },
        { password: { [Op.eq]: password } },
      ],
    },
  });
  if (searchUser === null) {
    res.status(400).json({ message: 'Campos inválidos' });
  } else {
    const token = createToken(email);
    res.json({ token });
  }
};

module.exports = loginController;
