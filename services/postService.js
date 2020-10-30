const { User, Post } = require('../models');
const { ErrHandler } = require('../errors');
const { UserLogin } = require('./userServices');

const CreatePost = async (payload, user) => {
  const { title, content } = payload;
  const { id: userId } = user.dataValues;

  const titleValidate = ErrHandler.VerifyPostTitle(title);
  const contentValidate = ErrHandler.VerifyPostContent(content);

  if (titleValidate) return titleValidate;
  if (contentValidate) return contentValidate;

  const newPost = await Post.create(
    {
      title,
      content,
      userId,
    },
  );

  return newPost;
};

const GetPosts = async () => {
  const posts = await Post.findAll({
    include: { model: User, as: 'user' },
    attributes: { exclude: ['userId'] },
  });

  return posts;
};

module.exports = {
  CreatePost,
  GetPosts,
};
