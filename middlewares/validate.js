module.exports = (schema) => (req, _res, next) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    const error = new Error(validationResult.error);
    error.status = 422;
    return next(error);
  }

  next();
};
