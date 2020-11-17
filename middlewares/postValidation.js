const boom = require('@hapi/boom');

module.exports = (req, _res, next) => {
  const { title, content } = req.body;

  console.log(title)

  if (!title) next(boom.badRequest('"title" is required'));

  if (!content) next(boom.badRequest('"content" is required'));

  next();
};
