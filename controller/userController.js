const createUser = require('../service/userService');

const insertUser = async (req, res) => {
  const response = await createUser(req.body);

  return response.token
    ? res.status(201).json(response)
    : res.status(response.code).json(response.message);
};

module.exports = {
  insertUser,
};
