const { Router } = require('express');
const { createUser } = require('../services/userServices');

const users = Router();

users.post('/', async (req, res) => {
  const { displayName, email = null, password, image } = req.body;
  const { status, response } = await createUser(displayName, email, password, image);
  return res.status(status).json(response);
});

module.exports = users;
