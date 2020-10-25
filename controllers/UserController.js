const { Router } = require('express');

const user = Router();

user.post('/', (req, res) => res.status(201).send('created user'));

module.exports = user;
