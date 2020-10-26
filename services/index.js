const {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUser,
  deleteUser,
} = require('./userService');

const {
  createPost,
} = require('./postService');

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUser,
  deleteUser,
  createPost,
};
