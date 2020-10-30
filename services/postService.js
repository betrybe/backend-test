const { User, Post } = require('../models');
const { ErrHandler } = require('../errors');

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

const GetPostsById = async (id) => {
  const post = await Post.findAll({
    where: { id },
    include: { model: User, as: 'user' },
    attributes: { exclude: ['userId'] },
  });

  if (post.length === 0) {
    const error = { error: { status: 404, message: 'Post não existe' } };
    return error;
  }

  return post[0];
};

module.exports = {
  CreatePost,
  GetPosts,
  GetPostsById,
};
