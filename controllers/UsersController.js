const { Users } = require('../models');

const getAll = async (_req, res) => {
  try {
    const getUsers = await Users.findAll();
    res.status(200);
    res.json(getUsers);
  } catch (e) {
    res.status(404).send({ message: 'test' });
  }
};

const getById = async (req, res) => {
  try {
    const getUsers = await Users.findByPk(req.params.id);
    res.status(200);
    res.json(getUsers);
  } catch (e) {
    res.status(404).send({ message: 'test' });
  }
};

const createNew = async (req, res) => {
  try {
    const { id, displayName, email, password, image } = req.body;
    const newUser = await Users.create({
      id,
      displayName,
      email,
      password,
      image,
    });
    res.status(200);
    res.json(newUser);
  } catch (e) {
    res.status(404).send({ message: 'test' });
  }
};

const updateById = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const result = await Users.update(
      {
        displayName,
        email,
        password,
        image,
      },
      { where: { id: req.params.id } },
    );
    res.status(200);
    res.json(result);
  } catch (err) {
    res.status(404).send({ message: 'test' });
  }
};

const deleteById = async (req, res) => {
  try {
    const userToDelete = await Users.findByPk(req.params.id);
    await userToDelete.destroy();
    res.status(200);
    res.json(userToDelete);
  } catch (e) {
    res.status(404).send({ message: 'test' });
  }
};

module.exports = {
  deleteById,
  getAll,
  getById,
  updateById,
  createNew,
};
