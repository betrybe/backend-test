module.exports = (models) => async (req, _res, next) => {
  const { title, content } = req.body;
  if (req.params.id) {
    const post = await models.Post.findByPk(req.params.id);
    if (!post) next('post_not_found');
    if (post.dataValues.userId !== req.user.id) return next('unauthorized_user');
    if (req.method === 'DELETE') return next();
  }

  if (!title) return next('title_required');
  if (!content) return next('content_required');

  next();
};
