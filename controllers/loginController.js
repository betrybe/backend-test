const { User } = require('../models');
const createToken = require('../utils/createToken');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const searchUser = await User.findOne({
    where: { email, password },
  });
  if (searchUser === null) {
    res.status(400).json({ message: 'Campos inválidos' });
  } else {
    const { id } = searchUser;
    const token = createToken({ id, email });
    res.json({ token });
  }
};

module.exports = loginController;
