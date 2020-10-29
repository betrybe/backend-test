const { Router } = require('express');
const auth = require('../middlewares/auth');

const userRoute = Router();

const createUser = (req, res) => {
  const { displayName, email, password, image } = req.body;
  return res.status(200).json({ displayName, email, password, image });
};

userRoute.route('/').get(auth(true)).post(createUser);
userRoute.route('/:id').get(auth(true));
userRoute.route('/me').delete(auth(true));

module.exports = userRoute;
