const rescue = require('express-rescue');
const createToken = require('../createToken');
const { verifyToken, verifyError } = require('../verifyToken');

const createUser = (service) =>
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const user = await service.createUser(displayName, email, password, image);
    if (user.err) {
      const { message } = user;
      return res.status(400).json({ message });
    }

    const token = createToken(user);
    return res.status(201).json({ token });
  });

const getUser = (service) =>
  rescue(async (req, res) => {
    const { email, password } = req.body;

    const user = await service.getUser(email, password);
    if (user.err) {
      const { message } = user;
      return res.status(400).json({ message });
    }

    const token = createToken(user);
    return res.status(201).json({ token });
  });

const getAllUsers = (service) =>
  rescue(async (req, res) => {
    const { authorization } = req.headers;
    verifyError(authorization, res);
    const users = await service.getAllUser();
    return res.status(201).json(users);
  });

const getUserById = (service) =>
  rescue(async (req, res) => {
    const { authorization } = req.headers;
    const validToken = verifyError(authorization, res);
    if (validToken !== undefined) return;
    const { id } = req.params;
    const user = await service.getUserById(id);
    if (user.err) {
      const { message } = user;
      return res.status(401).json({ message });
    }
    return res.status(200).json(user);
  });

const deleteMe = (service) =>
  rescue(async (req, res) => {
    const { authorization } = req.headers;
    const validToken = verifyError(authorization, res);
    if (validToken !== undefined) return;
    const { id } = verifyToken(authorization);
    const message = await service.deleteMe(id);
    if (message.err) return res.status(200).json(message);
    return res.status(204).json();
  });

const getUserController = (service) => ({
  createUser: createUser(service),
  getUser: getUser(service),
  getAllUsers: getAllUsers(service),
  getUserById: getUserById(service),
  deleteMe: deleteMe(service),
});

module.exports = { getUserController };
