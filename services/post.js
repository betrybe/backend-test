const { Post } = require('../models');

const createPost = async ({ title, content }, id) =>
  Post.create({ userId: id, title, content });

// const getAll = async () => User.findAll();

// const deleteUser = async (id) => User.destroy({ where: { id } });

// const getById = async (id) => {
//   const user = await User.findOne({ where: { id } });
//   if (!user) return { message: 'Usuário não existe' };
//   return user;
// };

module.exports = { createPost };
