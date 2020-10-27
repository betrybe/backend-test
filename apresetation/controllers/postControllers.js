const { Router } = require('express');
const rescue = require('express-rescue');
const validateToken = require('../middleware/tokenValidation');
const { postDataEmpty } = require('../middleware/authUser');
const {
  getUserByEmail,
  createPost,
  getAllPosts,
  getPostById,
  getAllPostsByQuery,
  deletePost,
} = require('../../services');

const post = Router();

post.post(
  '/',
  postDataEmpty,
  validateToken,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { email } = req.user;
    const user = await getUserByEmail(email);
    const { id } = user[0].dataValues;

    const createdPost = await createPost({ id, title, content });

    return res.status(201).json({
      title: createdPost.title,
      content: createdPost.content,
      userId: createdPost.userId,
    });
  }),
);

post.get(
  '/search',
  validateToken,
  rescue(async (req, res) => {
    const { q } = req.query;

    const getPostsQuery = await getAllPostsByQuery(q);

    return res.status(200).json(getPostsQuery);
  }),
);

post.get(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const postId = req.params.id;
    const { email } = req.user;

    const user = await getUserByEmail(email);
    const getPosts = await getPostById(postId);

    if (getPosts.length <= 0) return res.status(404).json({ message: 'Post não existe' });

    const { title, content, published, updated } = getPosts[0].dataValues;
    const { id, displayName, image } = user[0].dataValues;

    const arrPost = {
      id: Number(postId),
      title,
      content,
      published,
      updated,
      user: {
        id,
        displayName,
        email,
        image,
      },
    };

    return res.status(200).json(arrPost);
  }),
);

post.get(
  '/',
  validateToken,
  rescue(async (req, res) => {
    const { email } = req.user;

    const user = await getUserByEmail(email);
    const getPosts = await getAllPosts();

    const { title, content, published, updated } = getPosts[0].dataValues;
    const postId = getPosts[0].dataValues.id;
    const { id, displayName, image } = user[0].dataValues;

    const arrPost = [{
      id: Number(postId),
      title,
      content,
      published,
      updated,
      user: {
        id,
        displayName,
        email,
        image,
      },
    }];

    return res.status(200).json(arrPost);
  }),
);

post.put(
  '/:id',
  validateToken,
  postDataEmpty,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { email } = req.user;

    const user = await getUserByEmail(email);
    const { id } = user[0].dataValues;

    const getPosts = await getPostById(id);
    const { userId } = getPosts[0].dataValues;

    if (userId !== id) return res.status(401).json({ message: 'Usuário não autorizado' });

    await createPost({ id, title, content });

    return res.status(200).json({
      title,
      content,
      userId,
    });
  }),
);

post.delete(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { email } = req.user;
    const idParams = req.params.id;

    console.log(req.user);
    const user = await getUserByEmail(email);
    const { id } = user[0].dataValues;

    const getPosts = await getPostById(idParams);

    if (getPosts.length <= 0) return res.status(404).json({ message: 'Post não existe' });

    const { userId } = getPosts[0].dataValues;

    if (userId !== id) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    await deletePost(idParams);

    return res.status(204).end();
  }),
);

module.exports = post;
