const { Post } = require('../models');
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

module.exports = {
  CreatePost,
};
