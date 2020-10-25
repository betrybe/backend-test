const { User } = require('../models');

const createUser = async (displayName, email, password, image) =>
  User.create({ displayName, email, password, image });

const getUserByEmail = async (email) =>
  User.findAll({ where: { email } }).then((result) => result);

const getUserById = async (id) => User.findAll({ where: { id } });

const getAllUser = async () => User.findAll({});

const deleteUser = async (email) => User.destroy({ where: { email } });

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUser,
  deleteUser,
};
