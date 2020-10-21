const createUser = (service) =>
  async (req, res) => {
    const { displayName, email, image, password } = req.body;
    const token = await service.createUser({ displayName, email, image, password });

    if (!token) throw Error('internal_error');

    return res.status(201).json({ token });
  };

const userController = (service) => ({
  createUser: createUser(service),
});

module.exports = userController;
