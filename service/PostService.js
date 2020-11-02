const { ErrHandler } = require('../errors');
const { User, Post } = require('../models');

const postsUser = async (title, content, userId) => {
  const errTitle = ErrHandler.VerifyTitle(title);
  const errContent = ErrHandler.VerifyContent(content);

  if (errTitle) return errTitle;
  if (errContent) return errContent;

  const createPost = await Post.create({
    title,
    content,
    userId,
  });

  return createPost;
};

const getAllPosts = async () => {
  const getPostsAll = await Post.findAll({
    include: { model: User, as: 'user' },
    attribute: { exclude: ['userId'] },
  });
  return getPostsAll;
};

const PostById = async (id) => {
  const getPostById = await Post.findOne({
    where: { id },
    include: { model: User, as: 'user' },
    attribute: { exclude: ['userId'] },
  });

  if (!getPostById) {
    const postErroId = { error: { status: 404, message: 'Post não existe' } };
    return postErroId;
  }
  return getPostById;
};

const updatePosts = async (id, title, content, allInfoUser) => {
  const getPostsForUpadate = await Post.findOne({ where: { id } });
  const validatePosts = ErrHandler.VerifyPost(getPostsForUpadate, allInfoUser);
  if (validatePosts) return validatePosts;

  const errTitle = ErrHandler.VerifyTitle(title);
  const errContent = ErrHandler.VerifyContent(content);
  if (errTitle) return errTitle;
  if (errContent) return errContent;

  await Post.update({ title, content }, { where: { id } });

  const postUpdated = await Post.findOne({
    where: { id },
    attributes: { exclude: ['id', 'published', 'updated'] },
  });

  return postUpdated;
};

const deletePosts = async (id, allInfoUser) => {
  const findPostsDel = await Post.findOne({ where: { id } });
  if (!findPostsDel) {
    const errDelPost = { error: { status: 404, message: 'Post não existe' } };
    return errDelPost;
  }
  const validatePosts = ErrHandler.VerifyPost(findPostsDel, allInfoUser);
  if (validatePosts) return validatePosts;

  await Post.destroy({ where: { id } });
  return true;
};

module.exports = {
  postsUser,
  getAllPosts,
  PostById,
  updatePosts,
  deletePosts,
};
