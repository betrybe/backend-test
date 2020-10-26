const createUser = (service) =>
  async (req, res) => {
    const { displayName, email, image, password } = req.body;
    const token = await service.createUser({ displayName, email, image, password });

    if (!token) throw Error('internal_error');

    return res.status(201).json({ token });
  };

const login = (service) => async (req, res, next) => {
  const { email, password } = req.body;
  const result = await service.login(email, password);
  if (result.error) return next(result.error);

  return res.status(200).json({ token: result.token });
};

const getAll = (service) => async (_req, res) => {
  const users = await service.getAll();
  return res.status(200).json(users);
};

const getById = (service) => async (req, res, next) => {
  const user = await service.getById(req.params.id);
  if (!user) return next('user_not_found');

  return res.status(200).json(user);
};

const deleteMe = (service) => async (req, res) => {
  await service.deleteMe(req.user.id);
  // if (!user) return next('user_not_found');

  return res.status(204).end();
};

const userController = (service) => ({
  createUser: createUser(service),
  login: login(service),
  getAll: getAll(service),
  getById: getById(service),
  deleteMe: deleteMe(service),
});

module.exports = userController;
