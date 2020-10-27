const { Posts } = require('../models');
const { validatePostData } = require('../middlewares/valiData');

const findById = (id) => Posts.findOne({ where: { id } });

const createPost = async (data) => {
  const { title, content, userId } = data;

  const error = validatePostData(title, content);
  if (error) return error;
  // Campos em branco

  try {
    return await Posts.create({ title, content, userId });
  } catch (e) {
    return e;
  }
};

const updtPost = async (data) => {
  const { title, content, id } = data;

  const error = validatePostData(title, content);
  if (error) return error;
  // Campos em branco

  try {
    return await Posts.update({
      title,
      content,
    },
    { where: { id } });
  } catch (e) {
    return e;
  }
};

module.exports = {
  findById,
  createPost,
  updtPost,
};
