const rescue = require('express-rescue');

const createUser = (service) =>
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const user = await service.createUser(displayName, email, password, image);

    res.status(201).json(user);
  });

const getUserController = (service) => ({
  createUser: createUser(service),
});

module.exports = { getUserController };
