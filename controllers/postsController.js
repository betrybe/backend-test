const rescue = require('express-rescue');
const CustomError = require('../services/errorScheme');
const { postValidation } = require('../services/joiValidation');
const { BlogPosts } = require('../models');
const { Users } = require('../models');

const createPost = rescue(async (req, res) => {
  const { body: { title, content }, user } = req;
  const { id: userId } = user;
  return postValidation.validateAsync({ title, content })
    .then(() => BlogPosts.create({ title, content, user_id: userId })
      .then((data) => res.status(200).send(data.dataValues))
      .catch((err) => {
        throw new CustomError({ message: err.message, code: err.code });
      }))
    .catch((err) => {
      throw new CustomError({ message: err.message, code: 400 });
    });
});

const getPosts = rescue(async (req, res) => {
  const posts = await BlogPosts.findAll().then((data) => data);
  const postData = posts.map((post) => post.dataValues);
  const fetchUserData = postData.map(
    async ({ id, published, updated, title, content, user_id: userId }) => {
      const userData = async () => Users.findOne(
        { where: { id: userId } },
      );
      const { displayName, email, image } = await userData();
      const user = { userId, displayName, email, image };
      const newPost = { id, published, updated, title, content, user };
      return newPost;
    },
  );
  const postWithUserData = await Promise.all(fetchUserData).then((data) => data);
  res.status(200).send(postWithUserData);
});

const updatePost = rescue(async (req, res) => {
  const { body: { title, content }, user } = req;
  const { id: userId } = user;
  const { id: postId } = req.params;

  const { user_id: currentAuthorId } = await BlogPosts.findOne(
    { where: { id: postId } },
  ).then((data) => data.dataValues);

  if (Number(currentAuthorId) !== Number(userId)) throw new CustomError({ message: 'Só o autor pode editar posts.', code: 403 });

  return postValidation.validateAsync({ title, content })
    .then(() => BlogPosts.update(
      { title, content, user_id: userId },
      { where: { id: postId } },
    )
      .then(() => res.status(200).send({ message: 'Post atualizado com sucesso.' }))
      .catch((err) => {
        throw new CustomError({ message: err.message, code: err.code });
      }))
    .catch((err) => {
      throw new CustomError({ message: err.message, code: 400 });
    });
});

module.exports = {
  createPost,
  getPosts,
  updatePost,
};
