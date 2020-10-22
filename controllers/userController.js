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

const getUserController = (service) => ({
  createUser: createUser(service),
});

module.exports = { getUserController };
