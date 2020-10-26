const { Post } = require('../models');

const createPost = async (postTitle, postContent, ownerId) =>
  Post.create({ title: postTitle, content: postContent, userId: ownerId })
    .then(({ title, content, userId }) =>
      ({ status: 201, response: { title, content, userId } }))
    .catch(({ errors }) => ({ status: 400, response: { message: errors[0].message } }));

const getAllPosts = async () => Post.findAll();

// const getUserById = async (id) => {
//   const user = await User.findByPk(id);
//   if (!user) return { status: 404, response: { message: 'Usuário não existe' } };
//   return { status: 200, response: user };
// };

// const deteleUserById = async (id) => {
//   const user = await User.findByPk(id);
//   console.log(user);
//   if (!user) return { status: 404 };
//   await User.destroy({ where: { id } });
//   return { status: 204 };
// };

module.exports = {
  createPost,
  // userLogin,
  getAllPosts,
  // getUserById,
  // deteleUserById,
};
