const express = require('express');
const { userController } = require('../controllers');
const { authJWT } = require('../middlewares');

const router = express.Router();

router.get('/', authJWT, userController.callUsers);
router.get('/:id', authJWT, userController.callUserId);
router.delete('/me', authJWT, userController.deleteUser);
router.post('/', userController.createUser);

module.exports = router;
