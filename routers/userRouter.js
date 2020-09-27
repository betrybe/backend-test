const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

router.post('/', userControllers.addUser);

module.exports = router;
