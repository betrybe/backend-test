const { Router } = require('express');
const rescue = require('express-rescue');
const { UserPost } = require('../service');
const validateJwt = require('../authmiddleware/validateToken')

const router = Router();

router.post('/', validateJwt, rescue(async (req, res, next) => {
  const { id: userId } = req.user
  const { title, content } = req.body;

  const inputPosts = await UserPost.postsUser(title, content, userId)
  if (inputPosts.error) return next(inputPosts.error);
  res.status(201).json({
    title: inputPosts.title,
    content: inputPosts.content,
    userId: inputPosts.userId,
  })
}));

router.get('/', validateJwt, rescue(async (_req, res) => {
  const getPosts = await UserPost.getAllPosts();
  res.status(200).json(getPosts);

}));

router.get('/:id', validateJwt, rescue(async (req, res, next) => {
  const { id } = req.params;
  const getPostById = await UserPost.PostById(id);
  if (getPostById.error) return next(getPostById.error);
  res.status(200).json(getPostById);
}));

router.put('/:id', validateJwt, rescue(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const allInfoUser = req.user;
  const updatePostUser = await UserPost.updatePosts(id, title, content, allInfoUser);
  if (updatePostUser.error) return next(updatePostUser.error);
  res.status(200).json(updatePostUser);
}));

router.delete('/:id', validateJwt, rescue(async (req, res, next) => {
  const { id } = req.params;
  const allInfoUser = req.user;
  const delUserPosts = await UserPost.deletePosts(id, allInfoUser);
  if (delUserPosts.error) return next(delUserPosts.error);
  res.status(204).end();
}))

module.exports = router;
