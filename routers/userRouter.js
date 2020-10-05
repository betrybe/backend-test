const express = require('express');
const rescue = require('express-rescue');
const userControllers = require('../controllers/userControllers');
const { validateJWT } = require('../middlewares/auth');

const router = express.Router();

router.post('/', userControllers.addUser);

router.use(rescue(validateJWT));

router.get('/', userControllers.findAllUsers);

router.get('/:id', userControllers.findUserById);

router.delete('/me', userControllers.deleteUser);

module.exports = router;
