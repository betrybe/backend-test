// const createPosts = (service) => async (req, res) => {
//   const { title, content } = req.body;

//   if (!title) return res.status(400).json({ message: '"title" is required' });
//   if (!content) return res.status(400).json({ message: '"content" is required' });

//   const resultPost = await service.createPost(title, content, 'userId');
//   return res.status(201).json(resultPost);
// };

// const getPosts = (service) => async (req, res) =>
//   service.getPosts(service).then((result) => {
//     if (result.length === 0) return res.status(404).json({ message: 'not found' });
//     return res.status(200).json(result);
//   });

// const getPostsById = (service) => async (req, res) => {
//   const { id } = req.params;
//   service.getPostsById(id).then((result) => {
//     if (!result) return res.status(404).json({ message: 'not found' });
//     return res.status(200).json(result);
//   });
// };

// const putPosts = (service) => async (req, res) => {
//   const { id } = req.params;
//   const { title, content } = req.body;
//   service.putPosts(id, title, content).then((result) => {
//     res.status(200).json(result);
//   });
// };

// const deletePost = (service) => async (req, res) => {
//   const { id } = req.params;
//   service.deletePost(id).then(() => {
//     res.status(201).end();
//   });
// };

// const getPostControllers = (service) => ({
//   createPosts: createPosts(service),
//   getPosts: getPosts(service),
//   getPostsById: getPostsById(service),
//   putPosts: putPosts(service),
//   deletePost: deletePost(service),
// });

// module.exports = { getPostControllers };

const { Router } = require('express');
const rescue = require('express-rescue');

const Auth = require('../middlewares/auth');

const {
  getUserByEmail,
} = require('../../service/userService');

const {
  createPost,
  getAllPosts,
  getPostById,
  getAllPostsByQuery,
  deletePost,
} = require('../../service/postService');

const post = Router();

post.post('/', Auth, rescue(async (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });
  const { email } = req.user;
  const user = await getUserByEmail(email);
  const { id } = user[0].dataValues;

  const createdPost = await createPost({ id, title, content });

  return res.status(201).json({
    title: createdPost.title,
    content: createdPost.content,
    userId: createdPost.userId,
  });
}));

post.get(
  '/search',
  Auth,
  rescue(async (req, res) => {
    const { q } = req.query;

    const getPostsQuery = await getAllPostsByQuery(q);

    return res.status(200).json(getPostsQuery);
  }),
);

post.get(
  '/:id',
  Auth,
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
  Auth,
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
  Auth,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { email } = req.user;
    if (!title) return res.status(400).json({ message: '"title" is required' });
    if (!content) return res.status(400).json({ message: '"content" is required' });

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
  Auth,
  rescue(async (req, res) => {
    const { email } = req.user;
    const idParams = req.params.id;

    const user = await getUserByEmail(email);
    const getPosts = await getPostById(idParams);

    if (getPosts.length <= 0) return res.status(404).json({ message: 'Post não existe' });

    const { userId } = getPosts[0].dataValues;

    if (userId !== user[0].dataValues.id) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    await deletePost(idParams);

    return res.status(204).end();
  }),
);

module.exports = post;
