exports.post = (req, res, _next) => {
  res.status(200).send(req.body);
};
