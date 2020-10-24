module.exports = async (req, _res, next) => {
  const { title, content } = req.body;

  if (!title) return next('title_required');
  if (!content) return next('content_required');

  next();
};
