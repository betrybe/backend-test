const { Post } = require('../models');
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

module.exports = {
  CreatePost,
};
