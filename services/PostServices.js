const { Op } = require('sequelize');
const { User, Post } = require('../models');
const err = require('../errors');

const CreatePost = async (payload, user) => {
  const { title, content } = payload;
  const { id: userId } = user.dataValues;

  //* Faz as validações em payload
  const titleErr = err.ErrHandler.VerifyPostTitle(title);
  const contentErr = err.ErrHandler.VerifyPostContent(content);

  if (titleErr) return titleErr;
  if (contentErr) return contentErr;

  //* Passando nas validações é cadastrado o Post.
  const post = await Post.create({
    title,
    content,
    userId,
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

const GetPostById = async (id) => {
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

const UpdatePostById = async (payload, user, id) => {
  //* Verifica se o usuário que pediu update é o mesmo que criou o post.
  const post = await Post.findOne({ where: { id } });
  const userAndPostErr = err.ErrHandler.VerifyPostAndUser(post, user);

  if (userAndPostErr) return userAndPostErr;

  //* Faz as validações em payload
  const titleErr = err.ErrHandler.VerifyPostTitle(payload.title);
  const contentErr = err.ErrHandler.VerifyPostContent(payload.content);

  if (titleErr) return titleErr;
  if (contentErr) return contentErr;

  //* Após todas as validações é feito a atualização.
  const { title, content } = payload;
  await Post.update({ title, content }, { where: { id } });

  const uptPost = await Post.findOne({
    where: { id },
    attributes: { exclude: ['id', 'published', 'updated'] },
  });

  return uptPost;
};

const GetPostsByQuery = async (q) => {
  const post = await Post.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: { model: User, as: 'user' },
    attributes: { exclude: ['userId'] },
  });

  return post;
};

module.exports = {
  CreatePost,
  GetAllPosts,
  GetPostById,
  UpdatePostById,
  GetPostsByQuery,
};
