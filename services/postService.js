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
  const post = await Post.findOne({
    where: { id },
    include: { model: User, as: 'user' },
    attributes: { exclude: ['userId'] },
  });

  if (!post) {
    const error = { error: { status: 404, message: 'Post não existe' } };
    return error;
  }

  return post;
};

const UpdatePost = async (payload, userData, id) => {
  const { title, content } = payload;

  const getPost = await Post.findOne({ where: { id } });
  const userAndPostValidate = ErrHandler.VerifyPostAndUser(getPost, userData);

  if (userAndPostValidate) return userAndPostValidate;

  const titleValidate = ErrHandler.VerifyPostTitle(title);
  const contentValidate = ErrHandler.VerifyPostContent(content);

  if (titleValidate) return titleValidate;
  if (contentValidate) return contentValidate;

  await Post.update({ title, content }, { where: { id } });

  const upddatedPost = await Post.findOne({
    where: { id },
    attributes: { exclude: ['id', 'published', 'updated'] },
  });

  return upddatedPost;
};

const DeletePost = async (id, user) => {
  const existsPost = await Post.findOne({ where: { id } });

  if (!existsPost) {
    const error = { error: { status: 404, message: 'Post não existe' } };
    return error;
  }

  const userAndPostValidate = ErrHandler.VerifyPostAndUser(existsPost, user);

  if (userAndPostValidate) return userAndPostValidate;

  await Post.destroy({ where: { id } });

  return true;
};

module.exports = {
  CreatePost,
  GetPosts,
  GetPostsById,
  UpdatePost,
  DeletePost,
};
