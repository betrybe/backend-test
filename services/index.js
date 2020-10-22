const User = require('./users');
const Token = require('./token');
const Post = require('./posts');

module.exports = (models, utils) => ({
  User: User(models, utils),
  Token,
  Post: Post(models, utils),
});
