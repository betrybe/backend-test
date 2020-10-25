const { User, Post } = require('../models');
const err = require('../errors');

const CreatePost = async (payload, user) => {
  const { title, content } = payload;
  const { id: userId } = user.dataValues;

  // //* Faz as validações em payload
  const titleErr = err.ErrHandler.VerifyPostTitle(title);
  const contentErr = err.ErrHandler.VerifyPostContent(content);

  if (titleErr) return titleErr;
  if (contentErr) return contentErr;

  //* Passando nas validações é cadastrado o Post.
  const post = await Post.create({
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  });

  return post;
};

const GetAllPosts = async () => {
  const posts = await Post.findAll({
    include: { model: User, as: 'user' },
    attributes: { exclude: ['userId'] },
  });

  return posts;
};

const GetPostById = async(id) => {
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
  GetAllPosts,
  GetPostById,
};
