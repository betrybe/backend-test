const {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUser,
  deleteUser,
} = require('./userService');

const {
  createPost,
  getAllPosts,
  getPostById,
  getAllPostsByQuery,
  deletePost,
} = require('./postService');

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUser,
  deleteUser,
  createPost,
  getAllPosts,
  getPostById,
  getAllPostsByQuery,
  deletePost,
};
