const validateNewPost = (req, res, next) => {
  const { title, content } = req.body;
  const errMsgs = ['"title" is required', '"content" is required'];
  if (!title) return res.status(400).json({ message: errMsgs[0] });
  if (!content) return res.status(400).json({ message: errMsgs[1] });
  next();
};

module.exports = validateNewPost;
