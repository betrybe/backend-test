const rescue = require('express-rescue');
const { Users } = require('../models');
const { Posts } = require('../models');

const validatePost = (title, content) => {
  if (!title) {
    return { code: 400, message: '"title" is required' };
  }
  if (!content) {
    return { code: 400, message: '"content" is required' };
  }
};

const createPost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const { user: { email } } = req;

  const isPostValid = validatePost(title, content);
  console.log('isPostValid', isPostValid);
  if (isPostValid) {
    return res.status(isPostValid.code)
      .json({ message: isPostValid.message });
  }

  // const { id } = (await Users.findAll({ where: { email }, raw: true }));
  const { id: userId } = (await Users.findAll({ where: { email } }))[0];
  // console.log('id', id[0].id);
  Posts.create({ title, content, userId, published: new Date(), updated: new Date() })
    .then(() => res.status(201).json({ title, content, userId }));
});

const getAllPosts = rescue(async (req, res) => {
  const allPosts = await Posts.findAll({ include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }] });
  console.log(allPosts);
  res.status(200).json(allPosts);
});

module.exports = {
  createPost,
  getAllPosts,
};
