const users = require('./user');
const login = require('./login');
const post = require('./post');

module.exports = (controllers, middlewares) => ({
  users: users(controllers, middlewares),
  login: login(controllers, middlewares),
  post: post(controllers, middlewares),
});
