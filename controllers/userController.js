const rescue = require('express-rescue');

const createUser = (service) =>
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const user = await service.createUser(displayName, email, password, image);

    if (user.errors) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    return res.status(201).json(user);
  });

const userLogin = (service) =>
  rescue(async (req, res) => {
    const { email } = req.body;

    const user = await service.userLogin(email);

    if (user.errors) {
      return res.status(400).json(user.errors);
    }

    return res.status(200).json(user);
  });

const getAllUsers = (service) =>
  rescue(async (_req, res) => {
    const users = await service.getAllUsers();

    return res.status(200).json(users);
  });

const getUserById = (service) =>
  rescue(async (req, res) => {
    const { id } = req.params;

    const user = await service.getUserById(id);

    if (user.errors) {
      return res.status(404).json(user.errors);
    }

    return res.status(200).json(user);
  });

const deleteUser = (service) =>
  rescue(async (req, res) => {
    const { id } = req.user;

    await service.deleteUser(id);

    return res.status(204).end();
  });

const getUserController = (service) => ({
  createUser: createUser(service),
  userLogin: userLogin(service),
  getAllUsers: getAllUsers(service),
  getUserById: getUserById(service),
  deleteUser: deleteUser(service),
});

module.exports = { getUserController };
