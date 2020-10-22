const rescue = require('express-rescue');

const createUser = (service) =>
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const user = await service.createUser(displayName, email, password, image);

    if (user.errors) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    res.status(201).json(user);
  });

const userLogin = (service) =>
  rescue(async (req, res) => {
    const { email } = req.body;

    const user = await service.userLogin(email);

    if (user.errors) {
      return res.status(400).json(user.errors);
    }

    res.status(200).json(user);
  });

const getUserController = (service) => ({
  createUser: createUser(service),
  userLogin: userLogin(service),
});

module.exports = { getUserController };
