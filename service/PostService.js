const errHandler = require('../errors/errHandler');
const { User, Post } = require('../models');

const postsUser = async (title, content, userId) => {
  const errTitle = errHandler.VerifyTitle(title);
  const errContent = errHandler.VerifyContent(content);

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
  const getPostsForUpadate = Post.findOne({ where: { id } });
  const validatePosts = errHandler.VerifyPost(getPostsForUpadate, allInfoUser);
  if (validatePosts) return validatePosts;

  const errTitle = errHandler.VerifyTitle(title);
  const errContent = errHandler.VerifyContent(content);
  if (errTitle) return errTitle;
  if (errContent) return errContent;

  await Post.update({
    title, content,
  }, { where: { id } });

  const postUpdated = Post.findOne({
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
  const validatePosts = errHandler.VerifyPost(findPostsDel, allInfoUser);
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
