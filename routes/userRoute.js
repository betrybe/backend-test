const express = require('express');
const { userController } = require('../controllers');
const { authJWT } = require('../middlewares');

const router = express.Router();

router.get('/', authJWT, userController.getAllUsers);
router.get('/:id', authJWT, userController.getUserById);
router.delete('/me', authJWT, userController.deleteUserById);
router.post('/', userController.createUser);

module.exports = router;
