const { Op } = require('sequelize');

const createPost = (models) => async ({ title, content, userId }) => {
  console.log(title, content, userId);
  const post = await models.Post.create({
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  });
  return post.dataValues;
};

const getAll = (models) => async () => {
  const posts = await models.Post.findAll({
    include: {
      model: models.User,
      as: 'user',
    },
  });
  return posts.reduce((acc, { dataValues }) => {
    const filterPost = {
      ...dataValues,
      user: dataValues.user.dataValues,
    };
    return [...acc, filterPost];
  }, []);
};

const getById = (models) => async (id) => {
  const post = await models.Post.findByPk(id, {
    include: {
      model: models.User,
      as: 'user',
    },
  });

  if (!post) return post;

  return post.dataValues;
};

const updatePost = (models) => async (id, title, content, userId) => {
  const updated = await models.Post.update(
    { title, content },
    { where: { id } },
  );

  if (!updated) return updated;

  return { title, content, userId };
};

const deletePost = (models) => async (id) =>
  models.Post.destroy({ where: { id } });

const searchPost = (models) => async (query) => {
  const posts = await models.Post.findAll(
    { include: { model: models.User, as: 'user' },
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } },
        ],
      },
    },

  );
  return posts.reduce((acc, { dataValues }) => {
    const filterPost = {
      ...dataValues,
      user: dataValues.user.dataValues,
    };
    return [...acc, filterPost];
  }, []);
};

const postService = (models) => ({
  createPost: createPost(models),
  getAll: getAll(models),
  getById: getById(models),
  deletePost: deletePost(models),
  updatePost: updatePost(models),
  searchPost: searchPost(models),
});

module.exports = postService;
